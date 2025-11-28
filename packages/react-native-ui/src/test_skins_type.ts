
// Mocking the types to verify the fix
interface MockTextSkins {
    'extra-small': {};
    aaa: {}; // Augmented
}

const mockBuiltIn = {
    extraSmall: 'extra-small',
} as const;

// Proposed type definition
type TestSKINS = typeof mockBuiltIn & { [K in keyof MockTextSkins]: K } & Record<string, string>;

const s: TestSKINS = {} as any;

// Verification
const a = s.aaa; // Should be 'aaa'
const b = s.extraSmall; // Should be 'extra-small'
const c = s['extra-small']; // Should be 'extra-small'

// Check if 'aaa' is suggested (we can't check suggestion programmatically easily, but if the type is correct, it should be)
// We can check if 'aaa' is assignable to 'aaa'
const checkA: 'aaa' = s.aaa;
const checkB: 'extra-small' = s.extraSmall;
const checkC: 'extra-small' = s['extra-small'];
