const query = 'CREATE TABLE sales (product_id INT, cart_id INT, quantity MEDIUMINT, '
+ 'CONSTRAINT sales_product_id_foreign FOREIGN KEY (product_id) REFERENCES '
+ 'products(id) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT sales_cart_id_foreign ' 
+ 'FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE ON UPDATE CASCADE)'
export default function create_sales(conn){
	conn.query(query , (err)=>{
		if(err){
			console.log(err)
		}
	})
}
