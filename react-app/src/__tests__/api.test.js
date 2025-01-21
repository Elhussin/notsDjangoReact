const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { refreshToken } = require(`${__dirname}/../Api/api`);
describe("Token Refresh", () => {
    const mock = new MockAdapter(axios);

    it("should refresh the token successfully", async () => {
        const mockResponse = {
            access: "new_access_token",
        };
        mock.onPost("http://127.0.0.1:8000/api/token/refresh/").reply(200, mockResponse);

        localStorage.setItem("refresh_token", "test_refresh_token");

        const newToken = await refreshToken();
        expect(newToken).toBe(mockResponse.access);
        expect(localStorage.getItem("access_token")).toBe(mockResponse.access);
    });

    it("should fail to refresh token with invalid refresh token", async () => {
        mock.onPost("http://127.0.0.1:8000/api/token/refresh/").reply(401);

        localStorage.setItem("refresh_token", "invalid_refresh_token");

        await expect(refreshToken()).rejects.toThrow("Request failed with status code 401");
    });
});
