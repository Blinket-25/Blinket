// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const getResult = () =>
    new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve(
            Array(16).fill({
              name: "Product",
              image:
                "https://leeladharstores.com/image/cache/catalog/category/atta%20dal%20_%20grocery/refined%20and%20ghee/FORTUNE-SUNLITE-500x500.png",
              price: 150,
            })
          ),
        250
      );
    });

  const products = await getResult();

  res.status(200).json(products);
}
