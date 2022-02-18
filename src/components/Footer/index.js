import React from "react";
import Container from "../Container";
import Logo from "../../assets/images/logo.png";
import styles from "./styles.module.scss";

const Footer = () => {
	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.contentWrapper}>
					<div className={styles.contentLeft}>
						<div className={styles.page}>
							<div className={styles.title}>
								<div>Sitemap</div>
							</div>
							<div className={styles.listItem}>
								<div className={styles.item}>
									<div className={styles.itemName}>Trang chủ</div>
								</div>
								<div className={styles.item}>
									<div className={styles.itemName}>Dự án</div>
								</div>
								<div className={styles.item}>
									<div className={styles.itemName}>Explorer</div>
								</div>
								<div className={styles.item}>
									<div className={styles.itemName}>Hoán đổi</div>
								</div>
							</div>
						</div>

						<div className={styles.page}>
							<div className={styles.title}>
								<div>Thông tin</div>
							</div>
							<div className={styles.listItem}>
								<div className={styles.item}>
									<div className={styles.itemName}>Quyên góp</div>
								</div>
								<div className={styles.item}>
									<div className={styles.itemName}>Giới thiệu</div>
								</div>
							</div>
						</div>

						<div className={styles.page}>
							<div className={styles.title}>
								<div>Theo dõi</div>
							</div>
							<a
								data-bn-type="link"
								target="_blank"
								href="https://www.linkedin.com/test"
								className={styles.link}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									className="css-cdrjj0"
								>
									<path
										d="M19.663 3H4.327A1.32 1.32 0 003 4.306v15.398C3 20.424 3.597 21 4.327 21h15.336c.74 0 1.337-.576 1.337-1.296V4.306C21 3.586 20.403 3 19.663 3zM8.338 18.346H5.664V9.758h2.674v8.588zM7.001 8.575a1.54 1.54 0 01-1.543-1.543c0-.854.69-1.553 1.543-1.553.854 0 1.553.7 1.553 1.553 0 .854-.7 1.543-1.553 1.543zm11.335 9.771h-2.664V14.17c0-.997-.02-2.283-1.389-2.283-1.388 0-1.604 1.09-1.604 2.211v4.248h-2.664V9.758h2.561v1.172h.03c.36-.679 1.235-1.388 2.531-1.388 2.705 0 3.199 1.78 3.199 4.093v4.711z"
										fill="currentColor"
									></path>
								</svg>
							</a>
							<a
								data-bn-type="link"
								target="_blank"
								href="https://twitter.com/test"
								className={styles.link}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									className="css-cdrjj0"
								>
									<path
										d="M8.659 19c6.79 0 10.507-5.766 10.507-10.763 0-.16 0-.32-.01-.49A7.578 7.578 0 0021 5.79c-.663.3-1.376.5-2.127.6a3.824 3.824 0 001.63-2.1c-.713.44-1.503.75-2.352.92A3.6 3.6 0 0015.46 4c-2.04 0-3.698 1.699-3.698 3.787 0 .3.039.58.098.86-3.064-.15-5.786-1.669-7.61-3.957a3.858 3.858 0 00-.498 1.908c0 1.31.654 2.469 1.64 3.148a3.638 3.638 0 01-1.669-.47v.05c0 1.83 1.278 3.368 2.956 3.708a3.49 3.49 0 01-.976.13c-.234 0-.468-.02-.692-.07.468 1.509 1.834 2.598 3.453 2.628a7.284 7.284 0 01-4.585 1.62c-.293 0-.595-.01-.878-.05A10.206 10.206 0 008.659 19z"
										fill="currentColor"
									></path>
								</svg>
							</a>
							<a
								data-bn-type="link"
								target="_blank"
								href="https://www.instagram.com/test"
								className={styles.link}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									className="css-cdrjj0"
								>
									<path
										d="M12 4.625c2.407 0 2.685.01 3.641.052.874.04 1.358.185 1.666.308.422.165.72.36 1.04.669.318.319.514.617.668 1.039.123.318.267.792.308 1.666.042.946.052 1.234.052 3.641s-.01 2.685-.052 3.641c-.04.874-.185 1.358-.308 1.666-.165.422-.36.72-.669 1.04a2.66 2.66 0 01-1.039.668c-.318.123-.792.267-1.666.308-.946.042-1.234.052-3.641.052s-2.685-.01-3.641-.052c-.874-.04-1.358-.185-1.666-.308a2.911 2.911 0 01-1.04-.669 2.659 2.659 0 01-.668-1.039c-.123-.318-.267-.792-.308-1.666-.042-.946-.052-1.234-.052-3.641s.01-2.685.052-3.641c.04-.874.185-1.358.308-1.666.165-.422.36-.72.669-1.04a2.658 2.658 0 011.039-.668c.318-.123.792-.267 1.666-.308.956-.042 1.234-.052 3.641-.052zM12 3c-2.448 0-2.746.01-3.713.051-.957.052-1.615.196-2.18.422a4.311 4.311 0 00-1.595 1.039 4.311 4.311 0 00-1.039 1.594c-.226.566-.37 1.224-.422 2.18C3.011 9.255 3 9.553 3 12s.01 2.746.051 3.713c.042.957.196 1.615.422 2.18.226.597.535 1.091 1.039 1.595.504.504.998.813 1.594 1.039.576.226 1.224.37 2.18.422.957.04 1.266.051 3.714.051s2.746-.01 3.713-.051c.957-.042 1.615-.196 2.18-.422a4.311 4.311 0 001.595-1.039 4.311 4.311 0 001.039-1.594c.226-.576.37-1.224.422-2.18.04-.957.051-1.266.051-3.714s-.01-2.746-.051-3.713c-.042-.957-.196-1.615-.422-2.18a4.312 4.312 0 00-1.039-1.595 4.311 4.311 0 00-1.594-1.039c-.576-.226-1.224-.37-2.18-.422C14.745 3.011 14.447 3 12 3z"
										fill="currentColor"
									></path>
									<path
										d="M12 7.382a4.618 4.618 0 100 9.236 4.618 4.618 0 000-9.236zm0 7.622A3.007 3.007 0 018.997 12 3.007 3.007 0 0112 8.997 3.007 3.007 0 0115.004 12 3.007 3.007 0 0112 15.004zM16.803 8.276a1.08 1.08 0 100-2.16 1.08 1.08 0 000 2.16z"
										fill="currentColor"
									></path>
								</svg>
							</a>
							<a
								data-bn-type="link"
								target="_blank"
								href="https://t.me/test"
								className={styles.link}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									className="css-cdrjj0"
								>
									<path
										d="M12 3c-4.97 0-9 4.03-9 8.99C3 16.96 7.03 21 12 21s9-4.04 9-9.01C21 7.03 16.97 3 12 3zm4.433 5.651c-.058.835-1.602 7.072-1.602 7.072s-.096.364-.432.374a.58.58 0 01-.442-.173c-.355-.297-1.16-.873-1.919-1.4-.028.028-.057.057-.096.086-.172.153-.431.374-.71.643-.105.096-.22.201-.335.316l-.01.01a2.007 2.007 0 01-.173.153c-.374.307-.412.048-.412-.086l.201-2.197v-.02l.01-.019c.01-.028.029-.038.029-.038s3.924-3.492 4.03-3.867c.009-.019-.02-.038-.068-.019-.259.086-4.778 2.946-5.277 3.262-.029.02-.115.01-.115.01l-2.197-.72s-.26-.105-.173-.345c.02-.048.048-.096.154-.163.489-.346 9-3.406 9-3.406s.24-.077.383-.03c.067.03.106.058.144.154.01.039.02.116.02.202 0 .048-.01.105-.01.201z"
										fill="currentColor"
									></path>
								</svg>
							</a>
						</div>

						<div className={styles.page}>
							<div className={styles.title}>
								<div>Liên hệ</div>
							</div>
							<div className={styles.listItem}>
								<div className={styles.item}>
									<div className={styles.itemName}>Admin</div>
								</div>
								<div className={styles.item}>
									<div className={styles.itemName}>
										admin@cryptoforcharity.xyz
									</div>
								</div>
								<div className={styles.item}>
									<div className={styles.itemName}>Hợp tác</div>
								</div>
								<div className={styles.item}>
									<div className={styles.itemName}>
										media@cryptoforcharity.xyz
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.contentRight}>
						<div className={styles.mainContent}>
							<div className={styles.logo}>
								<img src={Logo} />
							</div>
							Copyright © 2022 Crypto for Charity. All rights reserved.
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Footer;
