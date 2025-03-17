"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoami = exports.register = exports.login = void 0;
var axios_1 = __importDefault(require("axios"));
var login = function (credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var response, e_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("http://fyp.mateenparkar.xyz/api/login", credentials)];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, response.data.token];
                case 2:
                    e_1 = _c.sent();
                    if (((_a = e_1.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                        throw new Error("Invalid credentials");
                    }
                    else if (((_b = e_1.response) === null || _b === void 0 ? void 0 : _b.status) === 500) {
                        throw new Error("Server error");
                    }
                    throw new Error("Could not login");
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.login = login;
var register = function (user) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2, axiosError;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("http://fyp.mateenparkar.xyz/api/register", user)];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _c.sent();
                    axiosError = e_2;
                    console.error("Registration error:", (_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data);
                    if ((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data) {
                        throw new Error(JSON.stringify(axiosError.response.data));
                    }
                    else {
                        throw new Error('Failed to register');
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.register = register;
var whoami = function (token) {
    return __awaiter(this, void 0, void 0, function () {
        var response, e_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("http://fyp.mateenparkar.xyz/api/whoami", {
                            headers: { Authorization: "Bearer ".concat(token) },
                        })];
                case 1:
                    response = _b.sent();
                    if (response.status === 200) {
                        return [2 /*return*/, response.data];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _b.sent();
                    if (((_a = e_3.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                        throw new Error("User isn't logged in");
                    }
                    return [3 /*break*/, 3];
                case 3: throw new Error("Couldn't get user");
            }
        });
    });
};
exports.whoami = whoami;
