// 存放初始数据
//clas:1 changxiao 2 renwen  3 gongju 4 ziren 5 shehui
const state = {
    //shopList 购物车中的商品
    shoplist: [],
    // list 所有的商品
    list: [
        {
            name: "《通往奴役之路》",
            image: "https://tse1-mm.cn.bing.net/th/id/R-C.8d4b76479911e50c0017dd2928b265e7?rik=qGQGXnIyOSf8dw&riu=http%3a%2f%2fimage12.bookschina.com%2f2020%2f20200825%2f3%2fB7007561.jpg&ehk=rmPyV2cGNnZJGl0EdyfC7ygDfHQSs4k%2fQQHUiGKdwX0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
            desc: "弗里德里希·奥古斯特·冯·哈耶克",
            price: 19.99,
            clas: 5
        },
        {
            name: "《数据结构C++版本》",
            image: "https://tse1-mm.cn.bing.net/th/id/OIP-C.NHP73TONT-MACvtoWNHg6QHaKh?pid=ImgDet&rs=1",
            desc: "邓俊辉",
            price: 29.99,
            clas: 4
        },
        {
            name: "《软件工程原理》",
            image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.IMN5NR_Zo8KR9_sXWqwSygAAAA?pid=ImgDet&rs=1",
            desc: "沈备军 陈昊鹏 陈雨亭",
            price: 29.99,
            clas: 4
        },
        {
            name: "《月亮与六便士》",
            image: "https://pic1.zhimg.com/v2-010b15621e098fee787446cd95908ea2_r.jpg?source=1940ef5c",
            desc: "威廉· 萨默赛特·毛姆",
            price: 8.88,
            clas: 1
        },
        {
            name: "《老人与海》",
            image: "https://qiangguo.cnki.net/Mall/Images/Book/Cover/water/DZ2005100067.jpg",
            desc: "海明威",
            price: 12.68,
            clas: 1
        },
        {
            name: "《高老头》",
            image: "https://tse1-mm.cn.bing.net/th/id/R-C.67ac97d38527754f5dea5a1f158b89db?rik=mPYY8Y3eu0VDEw&riu=http%3a%2f%2fp3.qhimg.com%2ft01a729711b0228addf.jpg&ehk=xcK50IXWi%2fvXrrtwMbPl0quy%2fYwarIjhvXJ4BGtbKWk%3d&risl=&pid=ImgRaw&r=0",
            desc: "巴尔扎克",
            price: 21.99,
            clas: 1
        },
        {
            name: "《国富论》",
            image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.dL3dSFmdywY_swVtrKbe4QHaJF?pid=ImgDet&rs=1",
            desc: " 亚当斯密",
            price: 17.77,
            clas:5
        },
        {
            name: "《量子物理》",
            image: "https://tse1-mm.cn.bing.net/th/id/R-C.8d4b76479911e50c0017dd2928b265e7?rik=qGQGXnIyOSf8dw&riu=http%3a%2f%2fimage12.bookschina.com%2f2020%2f20200825%2f3%2fB7007561.jpg&ehk=rmPyV2cGNnZJGl0EdyfC7ygDfHQSs4k%2fQQHUiGKdwX0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
            desc: "吕志国",
            price: 8.88,
            clas: 4
        },
        {
            name: "《就业、利息与货币通论》",
            image: "https://img13.360buyimg.com/n0/jfs/t17623/152/263664032/116511/28ee480b/5a670549N0bad66ad.jpg",
            desc: "凯恩斯",
            price: 9.09,
            clas: 5
        },
        {
            name: "《微观经济学》",
            image: "https://tse1-mm.cn.bing.net/th/id/R-C.bc123564a39233bd37b1b736f09cd858?rik=r3jTdf58NizZdg&riu=http%3a%2f%2fwww.ecsponline.com%2fbook%2f2018%2flt%2f9787030561794-001001-fcv_lt.jpg&ehk=GdGr0k0i60bU%2fhIQHxM5G5jyAvu1lVG4HPbuikZjD3I%3d&risl=&pid=ImgRaw&r=0",
            desc: "曼昆",
            price: 28.88,
            clas: 3
        },
        {
            name: "《海底两万里》",
            image: "https://pic1.zhimg.com/50/v2-d3bbd868cbaea7d037efb8e2509f87ae_720w.jpg?source=54b3c3a5",
            desc: "儒勒·凡尔纳",
            price: 7.99
        },
        {
            name: "《鲁滨逊漂流记》",
            image: "https://tse1-mm.cn.bing.net/th/id/R-C.75ddae4f00dee61c941c49d2845eae75?rik=fyHTibdAjLjHFQ&riu=http%3a%2f%2fpic.yidepiao.cn%2fpictures%2fmovie%2f2016-09%2fff994b6b-a403-4144-a260-892939eaddb0.jpg&ehk=TzeY%2bZDcsNpT57eK8cvdyNhrKs5un2U2qAyh2zD77zA%3d&risl=&pid=ImgRaw&r=0",
            desc: "丹尼尔·笛福",
            price: 6.99,
            clas: 1
        },
        {
            name: "《汤姆·索亚历险记》",
            image: "https://tse1-mm.cn.bing.net/th/id/R-C.c7c9d7f876e6f7d3b5d2a39f367b61fa?rik=nTrSiBEOrJTWFg&riu=http%3a%2f%2fimage.96192.com%2fproduct_pic%2f20151218%2f4210178.jpg&ehk=88zxFYZ7nOq6sk4%2f6cIl7bPpYsHAWOsQoXasVlCvxUY%3d&risl=&pid=ImgRaw&r=0",
            desc: "马克·吐温",
            price: 8.88,
            clas: 1
        },
        {
            name: "《水浒传》",
            image: "https://img12.360buyimg.com/n0/jfs/t15469/335/837283764/448629/cf77cd16/5a3a3629N2e7c5d6e.jpg",
            desc: "施耐庵",
            price: 29.99,
            clas:2
        },
        {
            name: "《三国演义》",
            image: "https://pic4.zhimg.com/50/v2-e1f8c8a13a1041e4450e6c19fab5b366_720w.jpg?source=54b3c3a5",
            desc: "罗贯中",
            price: 7.99,
            clas:2
        }
    ],
}

export default state