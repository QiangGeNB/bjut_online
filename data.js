var data = {
    //首页需要的信息
    swiper: [
        {
            url: '/images/swiper/1.jpg',
            actid: 1
        },
        { 
            url: '/images/swiper/2.jpg' ,
            actid: 2
        },
        { 
            url: '/images/swiper/3.jpg' ,
            actid: 3
        }
    ],
    activity: [
        {
            activityID: 1,
            activityTitle: '我是第一个活动标题',
            activityInt: '我是第二个活动的活动介绍，这个活动非常好玩，大家快来参加！我是第二个活动的活动介绍，这个活动非常好玩，大家快来参加！这个活动非常好玩这个活动非常好玩这个活动非常好玩这个活动非常好玩，这个活动非常好玩。',
            activityDate: '2017年6月23日',
            onlineTime: '2017年5月31日',
            duration: '1小时',
            activityImage: [
                '/images/swiper/1.jpg',
                '/images/swiper/2.jpg',
                '/images/swiper/3.jpg',
            ],
            activityType: 1,
            view_count: 100,
            fav_count: 200,
            fire: true
        },
        {
            activityID: 2,
            activityTitle: '我是第二个活动标题',
            activityInt: '我是第二个活动的活动介绍，这个活动非常好玩，大家快来参加！',
            activityDate: '2017年6月23日',
            onlineTime: '2017年5月31日',
            duration: '1小时',
            activityImage: [
                '/images/swiper/1.jpg',
                '/images/swiper/2.jpg',
                '/images/swiper/3.jpg',
            ],
            activityType: 1,
            view_count: 100,
            fav_count: 200,
            fire: false
        },
        {
            activityID: 3,
            activityTitle: '我是第三个活动标题',
            activityInt: '我是第三个活动的活动介绍，这个活动非常好玩，大家快来参加！',
            activityDate: '2017年6月23日',
            onlineTime: '2017年5月31日',
            duration: '1小时',
            activityImage: [
                '/images/swiper/1.jpg',
                '/images/swiper/2.jpg',
                '/images/swiper/3.jpg',
            ],
            activityType: 2,
            view_count: 100,
            fav_count: 200,
            fire: true
        }
    ],
    // 个人信息页面需要的数据
    student: {
        "nickName": "陈龙💭",
        "avatarUrl": "http://wx.qlogo.cn/mmhead/Jric5Lsvq8osZhaHzO6gBaia4fT1NTQ5ibqATGFuibHl2J0/132",
        "gender": 1,
        "province": "Beijing",
        "city": "",
        "sign": false,
        join_activity: [
            {
                activityID: 1,
                activityTitle: '我是第一个活动标题',
                activityDate: '2017年6月23日',
                onlineTime: '2017年5月31日',
                activityLocation: '知心园二层报告厅',
                activityImage: '/images/swiper/1.jpg',
                activityType: 1,
                fire: true
            },
            {
                activityID: 2,
                activityTitle: '我是第2个活动标题',
                activityDate: '2017年6月23日',
                onlineTime: '2017年5月31日',
                activityLocation: '知心园二层报告厅',
                activityImage: '/images/swiper/1.jpg',
                activityType: 1,
                fire: true
            }
        ],
        fav_activity: [
            {
                activityID: 1,
                activityTitle: '我是第一个活动标题',
                activityDate: '2017年6月23日',
                onlineTime: '2017年5月31日',
                activityLocation: '知心园二层报告厅',
                activityImage: '/images/swiper/1.jpg',
                activityType: 1,
                fire: true
            }
        ]
    },



    act_detail: {
        activityID: 2,
        activityTitle: '我是第二个活动标题',
        activityInt: '我是第二个活动的活动介绍，这个活动非常好玩，大家快来参加！',
        activityDate: '2017年6月23日',
        activityLocation: '知心园二层报告厅',
        onlineTime: '2017年5月31日',
        reporter: '雷军',
        duration: '1小时',
        mainImage: '/images/swiper/1.jpg',
        otherImage: [
            '/images/swiper/1.jpg',
            '/images/swiper/2.jpg',
            '/images/swiper/3.jpg',
        ],
        text: "与以往一些短期学术会议不同，此次program的来访者不仅要做学术报告，而且来访时间足够长，平均一周以上。这种安排旨在为海内外专家学者提供开放的国际合作环境和学术交流平台，并使交流与合作更加深入，合作更加充分。活动开幕式由上海交通大学物理与天文学院贾金峰教授主持，李政道研究所资深教授季向东在开幕式上介绍了李政道研究所的使命、建设目标以及发展方向。同时，上海交通大学物理与天文学院院长王孝群教授介绍了上海交通大学物理与天文学院的历史进程、专业设置、教学科研、人才培养以及人才引进等情况。 参加本次Program项目的有来自北京大学、清华大学、中国科学技术大学、中国科学院物理研究所、南京大学、同济大学、苏州大学、西安交通大学、香港大学、香港科技大学、美国卡弗里理论物理研究所、普林斯顿大学、麻省理工学院、犹他大学、加州大学圣地亚哥分校、波士顿学院等国内外20个大学与研究所的专家和师生。其中，2016年诺贝尔物理学奖获得者John Michael Kosterlitz教授在季向东教授的陪同下，参观访问了李政道研究所和李政道图书馆，并带来题为“Topological Order and Defects, and Phase Transitions in Two Dimensions”的大师讲坛精彩讲座。John Michael Kosterlitz教授因其在物质的拓扑相和拓扑相变理论上做出的突出贡献，与David Thouless教授和Duncan Haldane教授共同获得了2016年诺贝尔物理学奖。 ",
        activityType: 1,
        view_count: 100,
        fav_count: 200,
        fire: true,
        has_fav: false,
        has_join: true,
        remark: '请大家参加活动前准备好耳机等物品。'
    },
    //搜素界面需要的数据
    search:{
        hotTag:[
            "学术活动",
            "社团活动",
            "新生入学指南",
            "学术报销流程"
        ]
    },
    // 每天行走一万步需要的数据
    sport: {
        userinfo:{
            avater: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoYRXtw7CNxyD2rau3zlUk8hVqqYrz2icgtY5OMgDVXZhlcKuNw2jmduGVGkMFKAvicXXmXaJmWjoPQ/0',
            nickName: 'chenlong',
            academy: '计算机学院',
        },
        sport_data: {
            // 个人运动数据/排行
            my_sport_data:{
                step:10000,
                academy_rank: 12,
                academy_all:243,
                aca_gap:233,
                bjut_rank:22,
                bjut_all:4123,
                bjut_gap: 234
            }
        }
    }
};
module.exports.data = data;