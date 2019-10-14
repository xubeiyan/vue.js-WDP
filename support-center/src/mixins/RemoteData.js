export default function (resources) {
    return {
        data() {
            let initData = {
                remoteDataLoading: 0,
            }
            // 初始化数据属性
            initData.remoteErrors = {}
            for (const key in resources) {
                initData[key] = null
                initData.remoteErrors[key] = null
            }

            return initData
        },
        methods: {

            async fetchResource(key, url) {
                this.$data.remoteDataLoading++
                // 重置错误
                this.$data.remoteErrors[key] = null
                try {
                    this.$data[key] = await this.$fetch(url)
                } catch (e) {
                    console.error(e)
                    // 放置错误
                    this.$data.remoteErrors[key] = e
                }
                this.$data.remoteDataLoading--
            },
        },
        computed: {
            remoteDataBusy() {
                return this.$data.remoteDataLoading !== 0
            },
            hasRemoteErrors() {
                return Object.keys(this.$data.remoteErrors).some(
                    key => this.$data.remoteErrors[key]
                )
            },
        },
        created() {
            for (const key in resources) {
                let url = resources[key]
                this.fetchResource(key, url)
            }
        },
    }
}