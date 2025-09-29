export type KeyState = 'correct' | 'present' | 'absent' | 'unused';
export type KeyStates = Record<string, KeyState>;
export type KeyPress = string | 'ENTER' | 'BACKSPACE';