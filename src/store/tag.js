import parseToken from '@/utils/paseToken'
import request from '@/request'

export default {
    namespaced: true,
    actions: {
        async getTagList(context) {
            try {
                const { email } = parseToken()
                const { data } = await request({
                    method: 'GET',
                    url: '/api/tag',
                    params: {
                        email
                    }
                })

                const result = JSON.parse(data.data.tag)
                context.commit('GETTAGLIST', result)
            } catch (err) {
            }
        }
    },
    mutations: {
        GETTAGLIST(state, value) {
            state.tagList = value
        }
    },
    state: {
        tagList: {}
    },
}