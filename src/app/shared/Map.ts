import { MapChunk } from "./MapChunk";

export interface Map {
    mapName: string,
    mapDifficulty: string,
    mapChunks: Array<MapChunk>
}
