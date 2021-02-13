<template>
	<div class="login-page">
		<img src="../assets/images/login-bg.svg" alt="" id="bg" />
		<header class="sticky-top headernav">
			<nav class="navbar navbar-expand-lg navbar-light container">
				<a class="navbar-brand" href="#"><img src="../assets/images/chevron-cemcs.svg"/></a>
				<button
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav ml-auto ">
						<li class="nav-item ">
							<a class="nav-link" href="#">HOME</a>
						</li>
						<li class="nav-item ">
							<a class="nav-link" href="#">ABOUT US</a>
						</li>
						<li class="nav-item ">
							<a class="nav-link" href="#">CONTACT US</a>
						</li>
						<li class="nav-item ">
							<a class="nav-link" href="#">NEWS</a>
						</li>
						<li class="nav-item ">
							<a class="nav-link" href="/login">LOGIN</a>
						</li>
						<li class="nav-item register_btn">
							<a class="nav-link" href="/new-account">Register Now</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
        <section class="container">
            <div class="login-main">
                <div class="row no-gutters">
                    <div class="col-md-6 d-none d-lg-block">
                        <div class="login-slide ">
                            <!-- <img src="assets/images/login-slider.jpg"> -->
                            <!-- <b-carousel
                                id="login-carousel"
                                no-animation
                                indicators
                                img-height="500"
                                img-width="500"
                            >
                                <b-carousel-slide
                                    caption="Slider 1"
                                    img-src="../assets/images/login-slider.jpg"
                                ></b-carousel-slide>
                            </b-carousel> -->
                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src="../assets/images/login-slider.jpg"
                                            alt="First slide">
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="../assets/images/login-slider2.jpg"
                                            alt="Second slide">
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="../assets/images/login-slider.jpg"
                                            alt="Third slide">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="login-account">
                            <h1>Account Login</h1>
                            <p class="mb-3">Authorized login only.</p>
                            <div class="login-inputs">
                                <!-- <div class="memberid">
                                    <div class="icon">
                                        <img src="../assets/images/icons/user.svg">
                                    </div>
                                    <input type="text" placeholder="Member ID">
                                </div> -->
                                <div class="memberid">
                                    <div class="icon">
                                        <img src="../assets/images/icons/user.svg">
                                    </div>
                                    <b-form-input :type="text" placeholder="Member ID" />
                                </div>
                                <div class="password">
                                    <div class="icon">
                                        <img src="../assets/images/icons/secure.svg">
                                    </div>
                                    <b-form-input type="password" placeholder="Password" />
                                    <!-- <input type="text" placeholder="Password"> -->
                                </div>
                            </div>
                            <b-button class="login-btn">LOGIN</b-button>
                            <div class="d-flex justify-content-end">
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <div class="container">
                <div class="footer">
                    <img src="../assets/images/icons/lock.svg">
                    <p>Your transactions, credentials are secure.<br>
                        Don’t share login credentials with anyone.</p>
                </div>
            </div>
            <!-- <div class="cc">
                <div class="container">
                    <p>Copyright &copy; 2021 Chevron CEMCS Corporative</p>
                </div>
            </div> -->
        </footer>
	</div>
</template>

<script>
export default {
    mounted () {
        document.title = "Login | Chevron CEMCS Corporative"
    }
};

</script>

<style></style>
