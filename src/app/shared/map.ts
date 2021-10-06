import { Chunk } from "./chunk";

export interface Map {
    width: number;
    height: number;
    map: Array<Array<Chunk>>;
}