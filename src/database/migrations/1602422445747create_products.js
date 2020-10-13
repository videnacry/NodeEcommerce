const query = 'CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY,' 
+ 'title varchar(30), description varchar(60), price float, stock int, ' 
+ 'quality enum("bad", "regular", "good"))'
export default function create_products(conn){
	conn.query(query , (err)=>{
		if(err){
			console.log(err)
		}
	})
}
