// src/config/site-config.ts
import { SITE_IDENTITY, contact, name, brand, assets, meta, getFullAddress, getMetaTags, getManifestData } from '../site-identity';

export const SITE_CONTACT = contact;
export const SITE_NAME = name;
export const SITE_BRAND = brand;
export const SITE_ASSETS = assets;
export const SITE_META = meta;
export const SITE_SOCIALS = SITE_IDENTITY.contact.socials;

export {
  SITE_IDENTITY,
  getFullAddress,
  getMetaTags,
  getManifestData,
};
