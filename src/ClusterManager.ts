import {Cluster} from 'puppeteer-cluster'
import {ISerializeTaskArgs, serializeTask} from "./SerializeTask"
import {SerializedResponse} from "./renderer"

class ClusterManager {

    cluster: Promise<Cluster<ISerializeTaskArgs, SerializedResponse>>

    constructor () {
        this.cluster = this.initCluster()
    }

    protected async initCluster() {
        const cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_PAGE,
            maxConcurrency: 20,
            puppeteerOptions: {
                headless: true,
                args: ['--no-sandbox', '--disable-dev-shm-usage'],
                executablePath: '/usr/bin/chromium-browser'
            }
        })
        return cluster
    }

}



export const clusterManager = new ClusterManager()




