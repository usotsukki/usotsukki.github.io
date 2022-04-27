import { getRandomInt, convertRemToPixels } from "./utils.js";

export function scrollSetup() {
	const WIDTH = document.querySelector(".flex-container").clientWidth;
	//name to logo transition
	const name = document.querySelector(".name");
	let nameRect = name.getBoundingClientRect();
	let nameOffset = (nameRect.top + nameRect.bottom) / 2 + window.scrollY;

	const logo = document.querySelector(".logo");
	let logoRect = logo.getBoundingClientRect();
	let logoOffset = (logoRect.top + logoRect.bottom) / 2 + window.scrollY;

	const nameToLogo = logoOffset - nameOffset;

	// ScrollMagic controller
	const controller = new ScrollMagic.Controller();

	// timeline
	let tl = new gsap.timeline();

	//prepare projects
	const projects = [...document.querySelectorAll(".project")];
	projects.forEach((p) => {
		tl.staggerTo(p, 0, {
			x: convertRemToPixels(getRandomInt(-20, 20)),
			opacity: 0,
		});
	});

	//scrolled
	tl.to(".scroll-please", 3, { opacity: 0 });

	// transition Name to Logo
	tl.staggerTo(".my-name-is", 2, { opacity: 0, ease: Power1.easeOut });
	tl.staggerTo(".name", 5, {
		ease: Power1.easeOut,
		fontSize: convertRemToPixels(3),
		y: nameToLogo,
		x: 0,
	});
	tl.staggerTo(".logo", 1, {
		opacity: 1,
	});
	tl.staggerTo(".name", 5, {
		ease: Power1,
		opacity: 0,
	});

	// remove unnecesary text from front-panel
	[...document.querySelectorAll(".tbd")].forEach((e) => {
		tl.staggerTo(e, 2, {
			x: convertRemToPixels(getRandomInt(-20, 20)),
			y: convertRemToPixels(getRandomInt(-20, 20)),
			opacity: 0,
		});
	});

	// WEB-DEVELOPER rotation
	tl.staggerTo(".developer", 5, {
		css: {
			transform: "rotate(90deg) translate(50%,1000%)",
			color: "black",
			"box-sizing": "content-box",
			"text-shadow": "0 0 6px #ffffff80",
			"font-size": "10rem",
			"text-transform": "uppercase",
			"white-space": "nowrap",
			opacity: ".5",
		},
	});
	tl.staggerTo(".s1", 2, {
		css: {
			overflow: "hidden",
		},
	});

	//nav transition {
	tl.staggerTo(".nav-fs", 5, {
		x: convertRemToPixels(5),
		opacity: 0,
	});

	// Projects-section to front-panel
	tl.staggerTo(".projects", 5, {
		opacity: 1,
		//x: -((window.innerWidth - WIDTH) / 2 + convertRemToPixels(7)),
	});

	//display projects
	projects.forEach((p) => {
		tl.staggerTo(p, 4, { x: -convertRemToPixels(0), opacity: 1 });
	});

	// chain all to scrollmagic controller
	let scene = new ScrollMagic.Scene({
		triggerElement: "main",
		duration: window.innerHeight * 1.5,
		triggerHook: 0,
	})
		.setTween(tl)
		.setPin("main")
		.addTo(controller);
}
