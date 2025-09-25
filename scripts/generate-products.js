const fs = require("fs");

function generateProducts(count = 1000) {
  const categories = ["Điện tử", "Nhà cửa", "Thời trang", "Đồ gia dụng", "Phụ kiện"];
  const tags = [["gaming", "điện tử"], ["bếp", "nấu ăn"], ["áo", "quần"], ["inox", "gia dụng"], ["phụ kiện"]];

  const products = [];

  for (let i = 1; i <= count; i++) {
    const id = `shp-${1000 + i}`;
    const title = `Sản phẩm demo ${i}`;
    const slug = `san-pham-demo-${i}`;
    const price = Math.floor(Math.random() * 900000) + 100000; // 100k - 1tr
    const originalPrice = price + Math.floor(Math.random() * 200000) + 50000;
    const rating = (Math.random() * 2 + 3).toFixed(1); // từ 3.0 - 5.0
    const category = categories[i % categories.length];
    // const image = `assets/images/product-${i}.jpg`;
    const image = `https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9zk5r9k2gxw88`;
    const affiliateUrl = `https://shopee.vn/product/${1000 + i}?aff=YOUR_AFF&tracking_id=${id}`;

    products.push({
      id,
      title,
      slug,
      price,
      originalPrice,
      currency: "VND",
      image,
      images: [image],
      rating: parseFloat(rating),
      category,
      tags: tags[i % tags.length],
      affiliateUrl,
    });
  }

  return products;
}

const products = generateProducts(1000);
fs.writeFileSync("products.json", JSON.stringify(products, null, 2), "utf-8");
console.log("✅ File products.json đã được tạo!");
