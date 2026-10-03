import NextAuth,{type NextAuthOptions}from'next-auth';
import CredentialsProvider from'next-auth/providers/credentials';
import GoogleProvider from'next-auth/providers/google';
import FacebookProvider from'next-auth/providers/facebook';
import {neon}from'@neondatabase/serverless';
import {compare}from'bcryptjs';
import {verifyAuthenticationResponse}from'@simplewebauthn/server';
import type {OAuthConfig,OAuthUserConfig}from'next-auth/providers';
interface TikTokProfile{data?:{user?:{open_id?:string;union_id?:string;avatar_url?:string;display_name?:string}}}
function TikTokProvider<P extends TikTokProfile>(options:OAuthUserConfig<P>):OAuthConfig<P>{return{id:'tiktok',name:'TikTok',type:'oauth',authorization:{url:'https://www.tiktok.com/v2/auth/authorize/',params:{scope:'user.info.basic'}},token:'https://open.tiktokapis.com/v2/oauth/token/',userinfo:'https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name',client:{token_endpoint_auth_method:'client_secret_post'},profile(p){const u=p.data?.user;return{id:u?.open_id||u?.union_id||'',name:u?.display_name||'QuickDrop customer',email:null,image:u?.avatar_url||null}},checks:['state'],...options}}
function rpID(){return new URL(process.env.NEXTAUTH_URL||'http://localhost:3000').hostname}
function origin(){return process.env.NEXTAUTH_URL||'http://localhost:3000'}
async function ensureAuthTables(sql:any){
 await sql`CREATE TABLE IF NOT EXISTS quickdrop_users(id TEXT PRIMARY KEY,name TEXT NOT NULL,email TEXT UNIQUE NOT NULL,phone TEXT,password_hash TEXT,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
 await sql`ALTER TABLE quickdrop_users ALTER COLUMN password_hash DROP NOT NULL`.catch(()=>{});
 await sql`CREATE TABLE IF NOT EXISTS quickdrop_passkeys(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES quickdrop_users(id) ON DELETE CASCADE,public_key BYTEA NOT NULL,counter BIGINT NOT NULL DEFAULT 0,transports TEXT[],device_type TEXT,backed_up BOOLEAN,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
 await sql`CREATE TABLE IF NOT EXISTS quickdrop_passkey_challenges(id TEXT PRIMARY KEY,challenge TEXT NOT NULL,type TEXT NOT NULL,user_id TEXT,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
}
async function oauthUser(profile:any){
 if(!process.env.DATABASE_URL)return null;const sql=neon(process.env.DATABASE_URL);await ensureAuthTables(sql);const email=profile?.email?.toLowerCase();if(!email)return null;
 const existing=await sql`SELECT id,name,email FROM quickdrop_users WHERE LOWER(email)=LOWER(${email}) LIMIT 1`;if(existing.length)return{id:existing[0].id,name:existing[0].name,email:existing[0].email};
 const name=profile?.name||'QuickDrop customer',id=crypto.randomUUID();await sql`INSERT INTO quickdrop_users(id,name,email,phone,password_hash) VALUES(${id},${name},${email},NULL,NULL)`;return{id,name,email};
}
export const authOptions:NextAuthOptions={session:{strategy:'jwt'},providers:[
 CredentialsProvider({id:'credentials',name:'Phone, email and password',credentials:{identifier:{label:'Phone or email',type:'text'},password:{label:'Password',type:'password'}},async authorize(c){if(!c?.identifier||!c.password||!process.env.DATABASE_URL)return null;const sql=neon(process.env.DATABASE_URL);await ensureAuthTables(sql);const rows=await sql`SELECT id,name,email,password_hash FROM quickdrop_users WHERE (LOWER(email)=LOWER(${c.identifier}) OR phone=${c.identifier}) LIMIT 1`;const u=rows[0];if(!u?.password_hash||!(await compare(c.password,u.password_hash)))return null;return{id:u.id,name:u.name,email:u.email}}}),
 CredentialsProvider({id:'passkey',name:'Passkey',credentials:{assertion:{label:'WebAuthn assertion',type:'text'}},async authorize(c){if(!c?.assertion||!process.env.DATABASE_URL)return null;const sql=neon(process.env.DATABASE_URL);await ensureAuthTables(sql);try{const assertion:any=JSON.parse(c.assertion);const clientData=JSON.parse(Buffer.from(assertion.response.clientDataJSON,'base64url').toString('utf8'));const challenge=clientData.challenge;const ch=await sql`SELECT id,challenge FROM quickdrop_passkey_challenges WHERE challenge=${challenge} AND type='authentication' ORDER BY created_at DESC LIMIT 1`;if(!ch.length)return null;const rows=await sql`SELECT p.id,p.user_id,p.public_key,p.counter,p.transports,u.name,u.email FROM quickdrop_passkeys p JOIN quickdrop_users u ON u.id=p.user_id WHERE p.id=${assertion.id} LIMIT 1`;const p=rows[0];if(!p)return null;const v=await verifyAuthenticationResponse({response:assertion,expectedChallenge:ch[0].challenge,expectedOrigin:origin(),expectedRPID:rpID(),credential:{id:p.id,publicKey:new Uint8Array(p.public_key),counter:Number(p.counter),transports:p.transports||undefined}});if(!v.verified)return null;await sql`UPDATE quickdrop_passkeys SET counter=${v.authenticationInfo.newCounter} WHERE id=${p.id}`;await sql`DELETE FROM quickdrop_passkey_challenges WHERE id=${ch[0].id}`;return{id:p.user_id,name:p.name,email:p.email}}catch{return null}}})
 ],callbacks:{
 async signIn({user,account,profile}){if(account?.provider==='google'||account?.provider==='facebook'||account?.provider==='tiktok'){const linked=await oauthUser(profile);if(linked){user.id=linked.id;user.name=linked.name;user.email=linked.email}}return true},
 async redirect({url,baseUrl}){if(url.startsWith('/'))return baseUrl+url;try{if(new URL(url).origin===baseUrl)return url}catch{}return baseUrl+'/account'},
 async jwt({token,profile,account,user}){if(account)token.provider=account.provider;if(profile)token.providerProfile=profile;if(user){token.sub=user.id;token.name=user.name;token.email=user.email}return token},
 async session({session,token}){if(session.user){session.user.id=token.sub||'';session.user.name=token.name||session.user.name;session.user.email=token.email||session.user.email}return session}
 },pages:{signIn:'/login'}};const handler=NextAuth(authOptions);export{handler as GET,handler as POST};