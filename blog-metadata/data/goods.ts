interface Good {
  title: string
  subTitle: string
  description: string
  imgSrc: string
  rate: number
  price: number | string
  purchaseDate: string
}

const goodsData: Good[] = [
  {
    title: 'Mac Mini M4',
    subTitle: '16GB/256GB',
    description: `今年买的最划算的一件东西，极大的提升了我的工作效率，再也不用忍受巨硬系统的卡顿了，非常值得推荐。`,
    imgSrc: 'https://api.mahoo12138.cn/minio-blog/good/mac-mini-m4.png',
    rate: 5,
    purchaseDate: '2025-02-28',
    price: 4739,
  },
]

export default goodsData
