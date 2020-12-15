import React from "react";
import { NavLink } from "react-router-dom";

class Footer extends React.Component {
	render() {
		return (
			<div>
				<footer class='footer-section'>
					<div class='container'>
						<div class='row'>
							<div class='col-lg-3'>
								<div class='footer-left'>
									<div class='footer-logo'>
										<img
											src='img/logo_image.jpeg'
											width='100'
											height='50'
											alt=''
										/>
										<img
											src='img/logo_name.jpeg'
											height='50'
											width='120'
											alt=''
										/>
									</div>
									<ul>
										<li>Address: 202,Udhyog vihar phase V,Gurgaon(Haryana)</li>
										<li>Phone: +91 9910991208</li>
										<li>Email: mgarg073@gmail.com</li>
									</ul>
									<div class='footer-social'>
										<a href='https://www.facebook.com/modeZara6/'>
											<i class='fa fa-facebook'></i>
										</a>
										<a href='#'>
											<i class='fa fa-instagram'></i>
										</a>
										<a href='#'>
											<i class='fa fa-twitter'></i>
										</a>
									</div>
								</div>
							</div>
							<div class='col-lg-2 offset-lg-1'>
								<div class='footer-widget'>
									<h5>Quick Links</h5>
									<ul>
										<li>
											<NavLink
												exact
												className='login-panel'
												activeClassName='is-active'
												to='/Home'>
												Home
											</NavLink>
										</li>
										<li>
											<NavLink
												exact
												className='login-panel'
												activeClassName='is-active'
												to='/ContactUs'>
												Contact Us
											</NavLink>
										</li>

										<li>
											<NavLink
												exact
												className='login-panel'
												activeClassName='is-active'
												to='/Login'>
												Admin Login
											</NavLink>
										</li>
									</ul>
								</div>
							</div>
							<div class='col-lg-2'>
								<div class='footer-widget'>
									<h5>Our Collection </h5>
									<ul>
										<li>
											<NavLink
												exact
												className='login-panel'
												activeClassName='is-active'
												to='/Kurta'>
												Kurta
											</NavLink>
										</li>
										<li>
											<NavLink
												exact
												className='login-panel'
												activeClassName='is-active'
												to='/KurtaPlazo'>
												Kurta Plazo set
											</NavLink>
										</li>
										<li>
											<NavLink
												exact
												className='login-panel'
												activeClassName='is-active'
												to='/ALineKurta'>
												A Line Kurta
											</NavLink>
										</li>
										<li>
											<NavLink
												exact
												className='login-panel'
												activeClassName='is-active'
												to='/Dupatta'>
												Kurta Plazo Dupatta set
											</NavLink>
										</li>
									</ul>
								</div>
							</div>
							<div class='col-lg-4'>
								<div class='newslatter-item'>
									<h5>Join Our Newsletter Now</h5>
									<p>
										Get E-mail updates about our latest shop and special offers.
									</p>
									<form action='#' class='subscribe-form'>
										<input type='text' placeholder='Enter Your Mail' />
										<button type='button'>Subscribe</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div class='copyright-reserved'>
						<div class='container'>
							<div class='row'>
								<div class='col-lg-12'>
									<div class='copyright-text'>
										Copyright &copy;
										<script>
											document.write(new Date().getFullYear());
										</script>{" "}
										All rights reserved | This template is made with{" "}
										<i class='fa fa-heart-o' aria-hidden='true'></i> by{" "}
										<a href='https://colorlib.com' target='_blank'>
											Colorlib
										</a>
									</div>
									<div class='payment-pic'>
										<img src='img/payment-method.png' alt='' />
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer>
				<script src='../js/jquery-3.3.1.min.js'></script>
				<script src='../js/bootstrap.min.js'></script>
				<script src='../js/jquery-ui.min.js'></script>
				<script src='../js/jquery.countdown.min.js'></script>
				<script src='../js/jquery.nice-select.min.js'></script>
				<script src='../js/jquery.zoom.min.js'></script>
				<script src='../js/jquery.dd.min.js'></script>
				<script src='../js/jquery.slicknav.js'></script>
				<script src='../js/owl.carousel.min.js'></script>
				<script src='../js/main.js'></script>
			</div>
		);
	}
}

export default Footer;
