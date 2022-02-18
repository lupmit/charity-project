import React from "react";
import Container from "../../components/Container";
import Pic1 from "../../assets/images/pic1.svg";
import Pic2 from "../../assets/images/pic2.svg";
import Pic3 from "../../assets/images/pic3.svg";
import Pic4 from "../../assets/images/pic4.svg";
import styles from "./styles.module.scss";

const About = () => {
	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.contentWrapper}>
					<div className={styles.contentText}>
						<h1 className={styles.title}>VỀ CHÚNG TÔI</h1>
						<div className={styles.text}>
							Mục đích của chúng tôi là tạo ra giải pháp cho các dự án xã hội và
							nhân rộng chúng một cách nhanh chóng để thay đổi, giúp đỡ hàng
							triệu hoàn cảnh khó khăn.
						</div>
					</div>
					<div className={styles.imageWrapper}>
						<img src={Pic4} className={styles.image} />
					</div>
				</div>
				<div className={styles.contentWrapper}>
					<div className={styles.imageWrapper}>
						<img src={Pic1} className={styles.image} />
					</div>
					<div className={styles.contentText}>
						<h1 className={styles.title}>NHIỆM VỤ</h1>
						<div className={styles.text}>
							Với các đối tác và nhà tài trợ, chúng tôi mong muốn không chỉ tạo
							ra các giải pháp tối ưu và giải quyết vấn đề mình bạch trong từ
							thiện mà còn là một trải nghiệm hoàn toàn mới cho việc quyên góp.
							Chúng tôi cũng muốn mang đến cho mọi người khả năng xem những đóng
							góp của họ thông qua công nghệ blockchain . Chúng tôi hình dung
							một thế giới nơi công nghệ blockchain có thể được sử dụng cho hoạt
							động từ thiện như một hợp đồng xã hội nhằm chấm dứt tình trạng
							nghèo đói và bất bình đẳng.
						</div>
					</div>
				</div>
				<div className={styles.contentWrapper}>
					<div className={styles.contentText}>
						<h1 className={styles.title}>Ý tưởng</h1>
						<div className={styles.text}>
							Crypto Charity muốn thúc đẩy các giải pháp sáng tạo mới hướng tới
							các dự án từ thiện xã hội, nhân rộng chúng một cách hiệu quả để
							giúp đỡ cuộc sống của hàng triệu người. Chúng tôi muốn cung cấp
							cho những người không có điện thoại thông minh khả năng nhận và
							chuyển tiền điện tử như một hình thức thay thế để bảo vệ tài sản
							của họ.
						</div>
					</div>
					<div className={styles.imageWrapper}>
						<img src={Pic2} className={styles.image} />
					</div>
				</div>
				<div className={styles.contentWrapper}>
					<div className={styles.imageWrapper}>
						<img src={Pic3} className={styles.image} />
					</div>
					<div className={styles.contentText}>
						<h1 className={styles.title}>Cách tiếp cận</h1>
						<div className={styles.text}>
							Hệ thống quyên góp minh bạch Chúng tôi tạo ra một hệ thống quyên
							góp dựa trên blockchain giúp cho mỗi giao dịch trở nên minh bạch,
							có trách nhiệm và hiệu quả. Chúng tôi liên tục thử nghiệm và cải
							tiến các giải pháp của mình để có tác động tích cực với xã hội.
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default About;
