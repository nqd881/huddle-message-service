"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const app_1 = require("../../../application/app");
const app_command_1 = require("app-command");
const create_chat_1 = require("../../../application/use-cases/create-chat");
const send_message_1 = require("../../../application/use-cases/send-message");
const uuid_1 = require("uuid");
const app_core_1 = require("../app-core");
let ChatController = class ChatController {
    constructor(appCore) {
        this.appCore = appCore;
    }
    randomClient() {
        return new app_command_1.AppCommandBusClient((0, uuid_1.v4)());
    }
    newChat() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.randomClient();
            const command = client.newCommand(create_chat_1.CreateChatCommand, {
                chatId: (0, uuid_1.v4)(),
            });
            console.log("Command", command);
            try {
                const result = yield this.appCore.executeCommand(command);
                console.log(result);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    sendMessage(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.randomClient();
            const command = client.newCommand(send_message_1.SendMessageCommand, {
                chatId,
                contentText: "Hello baby",
            });
            const result = yield this.appCore.executeCommand(command);
            console.log(result);
        });
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "newChat", null);
__decorate([
    (0, common_1.Post)(":chat_id/messages"),
    __param(0, (0, common_1.Param)("chat_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)("chats"),
    __param(0, (0, common_1.Inject)(app_core_1.AppCoreModule.APP_CORE)),
    __metadata("design:paramtypes", [app_1.App])
], ChatController);
