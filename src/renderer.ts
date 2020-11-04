import * as puppeteer from 'puppeteer'
import * as url from 'url'
import {dirname} from 'path'

import {Config} from './config'
import {Cluster} from "puppeteer-cluster"
import {clusterManager} from "./ClusterManager"
import {ISerializeTaskArgs, serializeTask} from "./SerializeTask"

export type SerializedResponse = {
    status: number;
    customHeaders: Map<string, string>;
    content: string;
};

type ViewportDimensions = {
    width: number; height: number;
};

export const MOBILE_USERAGENT =
    'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Mobile Safari/537.36'

/**
 * Wraps Puppeteer's interface to Headless Chrome to expose high level rendering
 * APIs that are able to handle web components and PWAs.
 */
export class Renderer {

    private config: Config
    private cluster: Promise<Cluster>

    constructor(config: Config, cluster: Promise<Cluster>) {

        this.config = config
        this.cluster = cluster
    }

    async serialize(
        requestUrl: string, isMobile: boolean
    ): Promise<SerializedResponse> {
        const cluster = await clusterManager.cluster
        return await cluster.execute({requestUrl, isMobile, config: this.config}, serializeTask )
    }
}

type ErrorType = 'Forbidden' | 'NoResponse';

export class ScreenshotError extends Error {
    type: ErrorType

    constructor(type: ErrorType) {
        super(type)

        this.name = this.constructor.name

        this.type = type
    }
}
