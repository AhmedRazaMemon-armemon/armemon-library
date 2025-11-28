
import { TextSkins, SKINS, TextSkin } from './components/text';

// Attempt to augment the interface
declare module './components/text/types' {
    interface TextSkins {
        aaa: {};
    }
}

// Test if 'aaa' is now a valid key
const testSkin: keyof TextSkins = 'aaa';

// Test if SKINS.aaa works (it won't unless SKINS type is also updated or derived from TextSkins)
// SKINS is defined as typeof BUILT_IN_SKINS & Record<string, string>
// So SKINS.aaa is valid because of Record<string, string>, but it won't be suggested.

const s = SKINS.aaa; 
