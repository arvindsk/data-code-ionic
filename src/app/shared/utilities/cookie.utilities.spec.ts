import { getCookie, setCookie } from './cookie.utilities';

describe('Cookie Utilities', () => {

    const TEST_GET_COOKIE = 'test_get_cookie';
    const TEST_SET_COOKIE = 'test_set_cookie';

    afterEach(() => {
        document.cookie = TEST_GET_COOKIE + '=; path=/;expires=-1';
        document.cookie = TEST_SET_COOKIE + '=; path=/;expires=-1';
    });

    it('should get cookie from browser', () => {
        document.cookie = TEST_GET_COOKIE + '=getTest!;path=/';
        const actual = getCookie(TEST_GET_COOKIE);
        expect(actual).toBe('getTest!');
    });

    it('should return null if cookie does not exist', () => {
        const actual = getCookie('IAmNotReal');
        expect(actual).toBeNull();
    });

    it('should set cookie in browser', () => {
        setCookie(TEST_SET_COOKIE, 'setTest!');
        expect(document.cookie).toContain('setTest!');
    });

});
