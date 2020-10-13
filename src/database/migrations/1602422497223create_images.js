const query = 'CREATE TABLE images (id INT AUTO_INCREMENT PRIMARY KEY, ' 
+ 'path varchar(60), product_id int, CONSTRAINT images_user_id_foreign ' 
+ 'FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ' 
+ 'ON UPDATE CASCADE)'
export default function create_images(conn){
	conn.query(query , (err)=>{
		if(err){
			console.log(err)
		}
	})
}
