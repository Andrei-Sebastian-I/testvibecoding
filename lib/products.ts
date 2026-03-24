export interface Product {
  id: number;
  name: string;
  price: number;
  subtitle: string;
  description: string;
  image: string;
  images: string[];
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Artisan Ceramic Vase",
    price: 89,
    subtitle: "Hand-Thrown Stoneware",
    description:
      "Handcrafted ceramic vase with an organic silhouette. Each piece is uniquely shaped by master artisans, featuring a matte sage glaze that complements any interior. The irregular texture and warm tones make it a perfect centerpiece for minimalist and contemporary spaces alike.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSetpsyhIqi2k_UwbNEjbo4xHyFiIDGGLw9V81d6QZUFRHS4n4BzFQX4npnb-WxjHGP1AH6REGoafdnnB3GMVzhBIzTPC_AkTWv7gPqKmORBYmqn-Ah55TqLrP4ulg2_OgDpTizdfTj6pJprXLLNOSKBZ-WLBeWMBH3nH9Zgk7lekyenBtX5ko8OHz8pGeoHsHkVJmIxius07wpiSMkaA1m1gQEgo4IuQzcIBq5FwNFbelNThxcL8GB-ALIAGK2T0sZAnNNyRIPu2L",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSetpsyhIqi2k_UwbNEjbo4xHyFiIDGGLw9V81d6QZUFRHS4n4BzFQX4npnb-WxjHGP1AH6REGoafdnnB3GMVzhBIzTPC_AkTWv7gPqKmORBYmqn-Ah55TqLrP4ulg2_OgDpTizdfTj6pJprXLLNOSKBZ-WLBeWMBH3nH9Zgk7lekyenBtX5ko8OHz8pGeoHsHkVJmIxius07wpiSMkaA1m1gQEgo4IuQzcIBq5FwNFbelNThxcL8GB-ALIAGK2T0sZAnNNyRIPu2L",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnJxh0vM7GcCLj-3Nv9EVDYBG_hhPtqHsbwEWP5qj9LbugbEfbBeG-YcquMYxcngKfaZ3p7MAqUSWP5MwFUxAyBx-b40wnf31stPhugwr8ejdvVk1-4iIcAJOGefr6ITOwA3_LtQ8exOCXsrjtT8a0tKBT1EcZ4AfZt5KOytNjSz7T7QmL_O1Uh6AZiFXyRmHWnnh4lylcrKq09oLacH_C69pG2JpPz8BdmY-i2CTIZAJ-OA9e39HwJHGEnCPPvsA0EF-sR0ijfLjg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHwgihbDg7z2WRgJlVeSwMYZFMJ3_bKPocFswdp9FLb8lZSmWgWLp1XPhT3FoqHxkxUaTfAwsZiGgDFQgRWqtiU4g3Cu3twF5cUWv4BRhebNScw4CVDEpr11S-WpcNLAJ2YD-gKUDFlvznLOEpdXb_KTzhVYdKX3wBFgAjln0CvUIwghnlLWDA07CgxyI33jdVi67m6BW5SR9bcGUf76Hj_KRHIyPNmjmMEyBL89-0FBqz8OIbYlngMt0cHwybmdkfBs5FageOQtCl",
    ],
    category: "Ceramics",
  },
  {
    id: 2,
    name: "Velvet Cushion Set",
    price: 120,
    subtitle: "Set of Three Plush Pillows",
    description:
      "Luxurious velvet cushions in rich, earthy tones with refined piping detail. This set of three pillows in varying sizes is filled with premium duck feather for ultimate comfort. The sumptuous texture adds warmth and sophistication to any sofa or bed.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoyXBXDobY7NXAsRSK95Isy1D-Qgxmuzvz4B2TzFK7Fp5RO84seZRyjwhDOvvZV3XWvIUQdbbyIplqZqVjSH3ARFdeZeMJSyoGI0dqw-yxVR0EStpUrbE7YmbE5MRNPsnOz_ekRcv0JD1H4I21RNs1q394ngcsf_x3Ydh6Cex_HMPvDz48mBQjb1eFOmVta5waJ0ajkapyigL87IPJZdJrPtTCCsCg5GzGQj2fjHr_ymKD8swmqJn59p0y-wrDh_3mhI29_gg_usLl",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBoyXBXDobY7NXAsRSK95Isy1D-Qgxmuzvz4B2TzFK7Fp5RO84seZRyjwhDOvvZV3XWvIUQdbbyIplqZqVjSH3ARFdeZeMJSyoGI0dqw-yxVR0EStpUrbE7YmbE5MRNPsnOz_ekRcv0JD1H4I21RNs1q394ngcsf_x3Ydh6Cex_HMPvDz48mBQjb1eFOmVta5waJ0ajkapyigL87IPJZdJrPtTCCsCg5GzGQj2fjHr_ymKD8swmqJn59p0y-wrDh_3mhI29_gg_usLl",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGyeIroofgpkXtK32wMMRfkxsYG-D4PrD1gwSQmS85fdTF3MAb5JxnaSlv1P-cAAntPA9nj2C_UbqEheR2XrjYNJ2UOyRoEsXV3OyA-_N18h84l8pbTzbOu1YXZYU7_1cw8tydahjuw9R8WOnBw_kDZIeGmK4x5DavIRPj7kw9GbiqIrY0smhgRaROATN4pcAZXB4uU7XVH8yXieFajAjbMrTN9VuO0SmAyRZK_sItD9EMJZCisQOpIYwiSJjc3hbykS7dyH4NP4nq",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSetpsyhIqi2k_UwbNEjbo4xHyFiIDGGLw9V81d6QZUFRHS4n4BzFQX4npnb-WxjHGP1AH6REGoafdnnB3GMVzhBIzTPC_AkTWv7gPqKmORBYmqn-Ah55TqLrP4ulg2_OgDpTizdfTj6pJprXLLNOSKBZ-WLBeWMBH3nH9Zgk7lekyenBtX5ko8OHz8pGeoHsHkVJmIxius07wpiSMkaA1m1gQEgo4IuQzcIBq5FwNFbelNThxcL8GB-ALIAGK2T0sZAnNNyRIPu2L",
    ],
    category: "Textiles",
  },
  {
    id: 3,
    name: "Marble Table Lamp",
    price: 215,
    subtitle: "Solid Carrara Base",
    description:
      "Elegant table lamp with a genuine Carrara marble base and linen drum shade. The warm ambient lighting creates a cozy atmosphere, perfect for living rooms and bedrooms. The natural veining in each marble base ensures every lamp is one of a kind.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3kdBlsN2Nv-5lmeZGVDE7BkwpBrahY9tsL3T_hhwNuZjC0sM72wi1E-4JboWOE8xAT4vZGJpU_5n00yGWXSyvSH_VQVIOeizcZLyicN2qFe6_KvHVcV_tSSiCf5jJhdlTuTytgJgurb5a0ZVcg9vqUyNI2NlpkEdYmxouaUrHd386Del3wKorGDVyxU4Znk4JWPoXMW5jideW9GLo5AndW0CtO-e8fBaVm_6hawQrzSTBTl0tLjw65oY_LNjZdncIZgaNF6A5MLuu",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3kdBlsN2Nv-5lmeZGVDE7BkwpBrahY9tsL3T_hhwNuZjC0sM72wi1E-4JboWOE8xAT4vZGJpU_5n00yGWXSyvSH_VQVIOeizcZLyicN2qFe6_KvHVcV_tSSiCf5jJhdlTuTytgJgurb5a0ZVcg9vqUyNI2NlpkEdYmxouaUrHd386Del3wKorGDVyxU4Znk4JWPoXMW5jideW9GLo5AndW0CtO-e8fBaVm_6hawQrzSTBTl0tLjw65oY_LNjZdncIZgaNF6A5MLuu",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHwgihbDg7z2WRgJlVeSwMYZFMJ3_bKPocFswdp9FLb8lZSmWgWLp1XPhT3FoqHxkxUaTfAwsZiGgDFQgRWqtiU4g3Cu3twF5cUWv4BRhebNScw4CVDEpr11S-WpcNLAJ2YD-gKUDFlvznLOEpdXb_KTzhVYdKX3wBFgAjln0CvUIwghnlLWDA07CgxyI33jdVi67m6BW5SR9bcGUf76Hj_KRHIyPNmjmMEyBL89-0FBqz8OIbYlngMt0cHwybmdkfBs5FageOQtCl",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnJxh0vM7GcCLj-3Nv9EVDYBG_hhPtqHsbwEWP5qj9LbugbEfbBeG-YcquMYxcngKfaZ3p7MAqUSWP5MwFUxAyBx-b40wnf31stPhugwr8ejdvVk1-4iIcAJOGefr6ITOwA3_LtQ8exOCXsrjtT8a0tKBT1EcZ4AfZt5KOytNjSz7T7QmL_O1Uh6AZiFXyRmHWnnh4lylcrKq09oLacH_C69pG2JpPz8BdmY-i2CTIZAJ-OA9e39HwJHGEnCPPvsA0EF-sR0ijfLjg",
    ],
    category: "Lighting",
  },
  {
    id: 4,
    name: "Woven Wall Tapestry",
    price: 175,
    subtitle: "Hand-Loomed Organic Cotton",
    description:
      "Hand-woven macramé wall hanging crafted from natural organic cotton rope. A stunning bohemian statement piece measuring 90cm x 120cm. The intricate knotwork showcases traditional weaving techniques passed down through generations of artisan families.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6tLPETwvNIPev2T1mkc1AN3j_OyJOJOwj3tVsYzFoN1Ksrq-feuDinkePz3qWN5tJj1RKgakV50Rd7mAAX8EJQ7uxZYJDtYsFrl8ZWELEobYuTV4tVTIFOqF7seTevMaHbA1qWYPFVzHDGVid4tI3I3x291efC5Jk4tjh6ky6gJWb5t_3n7JlrK-p0YUx89Ol9V5O-h0W-p4WBbt2IJRB5m36KtRxBzhqwDuNRlsGNjKr4ecYbLHee70RUyKvoBYoJuJfEIEsytIg",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6tLPETwvNIPev2T1mkc1AN3j_OyJOJOwj3tVsYzFoN1Ksrq-feuDinkePz3qWN5tJj1RKgakV50Rd7mAAX8EJQ7uxZYJDtYsFrl8ZWELEobYuTV4tVTIFOqF7seTevMaHbA1qWYPFVzHDGVid4tI3I3x291efC5Jk4tjh6ky6gJWb5t_3n7JlrK-p0YUx89Ol9V5O-h0W-p4WBbt2IJRB5m36KtRxBzhqwDuNRlsGNjKr4ecYbLHee70RUyKvoBYoJuJfEIEsytIg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBoyXBXDobY7NXAsRSK95Isy1D-Qgxmuzvz4B2TzFK7Fp5RO84seZRyjwhDOvvZV3XWvIUQdbbyIplqZqVjSH3ARFdeZeMJSyoGI0dqw-yxVR0EStpUrbE7YmbE5MRNPsnOz_ekRcv0JD1H4I21RNs1q394ngcsf_x3Ydh6Cex_HMPvDz48mBQjb1eFOmVta5waJ0ajkapyigL87IPJZdJrPtTCCsCg5GzGQj2fjHr_ymKD8swmqJn59p0y-wrDh_3mhI29_gg_usLl",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzkcdjQRSRQK4K207ttnDnmd-uh1uhVzNWRUxvZo1QiNmAfW19pMVR66GkJf2gU7DmH3xUmPjQDCT-nIv91GeT27WVMqkjOgdEWT4ZHTkbDPH4qvoshnYoDJXLzCufsXjnDca0Kkaotxn4VMlDDK4oVIRY_eIjZQJ6cWyI3Pfe_xamMSFFRUSlX8xQLwCfp4cLFQ15u6VPrgQmBxqpoEk4OmNE3Tkt3xt1RuXNZ7q8fmG5XRGsV3dptimv-alzkhAiUNFms2lKFmFj",
    ],
    category: "Wall Art",
  },
  {
    id: 5,
    name: "Gold Leaf Mirror",
    price: 340,
    subtitle: "Hand-Applied Finish",
    description:
      "Ornate round mirror with hand-applied gold leaf frame. 80cm diameter, this statement piece serves as a stunning focal point in entryways, living rooms, or above a vanity. The artisan finish ensures a warm, luminous glow that enhances any room.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzkcdjQRSRQK4K207ttnDnmd-uh1uhVzNWRUxvZo1QiNmAfW19pMVR66GkJf2gU7DmH3xUmPjQDCT-nIv91GeT27WVMqkjOgdEWT4ZHTkbDPH4qvoshnYoDJXLzCufsXjnDca0Kkaotxn4VMlDDK4oVIRY_eIjZQJ6cWyI3Pfe_xamMSFFRUSlX8xQLwCfp4cLFQ15u6VPrgQmBxqpoEk4OmNE3Tkt3xt1RuXNZ7q8fmG5XRGsV3dptimv-alzkhAiUNFms2lKFmFj",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzkcdjQRSRQK4K207ttnDnmd-uh1uhVzNWRUxvZo1QiNmAfW19pMVR66GkJf2gU7DmH3xUmPjQDCT-nIv91GeT27WVMqkjOgdEWT4ZHTkbDPH4qvoshnYoDJXLzCufsXjnDca0Kkaotxn4VMlDDK4oVIRY_eIjZQJ6cWyI3Pfe_xamMSFFRUSlX8xQLwCfp4cLFQ15u6VPrgQmBxqpoEk4OmNE3Tkt3xt1RuXNZ7q8fmG5XRGsV3dptimv-alzkhAiUNFms2lKFmFj",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3kdBlsN2Nv-5lmeZGVDE7BkwpBrahY9tsL3T_hhwNuZjC0sM72wi1E-4JboWOE8xAT4vZGJpU_5n00yGWXSyvSH_VQVIOeizcZLyicN2qFe6_KvHVcV_tSSiCf5jJhdlTuTytgJgurb5a0ZVcg9vqUyNI2NlpkEdYmxouaUrHd386Del3wKorGDVyxU4Znk4JWPoXMW5jideW9GLo5AndW0CtO-e8fBaVm_6hawQrzSTBTl0tLjw65oY_LNjZdncIZgaNF6A5MLuu",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6tLPETwvNIPev2T1mkc1AN3j_OyJOJOwj3tVsYzFoN1Ksrq-feuDinkePz3qWN5tJj1RKgakV50Rd7mAAX8EJQ7uxZYJDtYsFrl8ZWELEobYuTV4tVTIFOqF7seTevMaHbA1qWYPFVzHDGVid4tI3I3x291efC5Jk4tjh6ky6gJWb5t_3n7JlrK-p0YUx89Ol9V5O-h0W-p4WBbt2IJRB5m36KtRxBzhqwDuNRlsGNjKr4ecYbLHee70RUyKvoBYoJuJfEIEsytIg",
    ],
    category: "Mirrors",
  },
];

export function getProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(id: number): Product[] {
  const product = products.find((p) => p.id === id);
  if (!product) return products.slice(0, 3);

  const others = products.filter((p) => p.id !== id);
  const sameCategory = others.filter((p) => p.category === product.category);
  const differentCategory = others.filter(
    (p) => p.category !== product.category
  );

  return [...sameCategory, ...differentCategory].slice(0, 3);
}
