"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.InMemoryRepo = void 0;
const common_1 = require("@nestjs/common");
// import { EVENT_STORE, IEventStore } from 'infrastructure/modules/event-store';
let InMemoryRepo = class InMemoryRepo {
    constructor() {
        this.records = [];
    }
    // constructor(@Inject(EVENT_STORE) private eventStore: IEventStore) {}
    // eventDispatcher(): IAggregateEventDispatcher {
    //   return {
    //     dispatch: (event) => {
    //       this.eventStore.append(event);
    //     },
    //   };
    // }
    save(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.records.findIndex((record) => record.id() === instance.id());
            if (index < 0)
                this.records.push(instance);
            else
                this.records[index] = instance;
        });
    }
    id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.records.find((record) => record.id() === id)) !== null && _a !== void 0 ? _a : null;
        });
    }
};
exports.InMemoryRepo = InMemoryRepo;
exports.InMemoryRepo = InMemoryRepo = __decorate([
    (0, common_1.Injectable)()
], InMemoryRepo);
