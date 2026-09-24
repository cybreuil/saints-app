Oui, là j'ai compris : la boule doit être animée à l'entrée uniquement quand tu arrives sur une route qui n'était pas représentée par un NavLink du header. Donc :

    /404 → /saints → apparition de la boule

    /about → /saints → déplacement layout="x" normal

    /saints → /gallery → déplacement layout="x" normal

    /gallery → /404 → disparition de la boule

    /404 → /404 → pas pertinent

    et aucune animation d'entrée/sortie parasite lors d'un simple changement de NavLink.

Le plus propre est de déterminer si la route précédente était une route du header.
Dans ton Header

Ajoute :

import { useRef } from "react";

Puis :

const { pathname } = useLocation();

const previousPathname = useRef(pathname);

const isHeaderRoute = NAV_ITEMS.some(({ to }) => to === pathname);
const wasHeaderRoute = NAV_ITEMS.some(
({ to }) => to === previousPathname.current
);

const isEnteringHeaderRoute = isHeaderRoute && !wasHeaderRoute;
const isLeavingHeaderRoute = !isHeaderRoute && wasHeaderRoute;

useEffect(() => {
previousPathname.current = pathname;
}, [pathname]);

Ensuite ton dot devient simplement :

<AnimatePresence initial={false}>
	{isActive && (
		<motion.span
			className="header__active-dot"
			layoutId="header-active-dot"
			layout="x"
			initial={
				isEnteringHeaderRoute
					? {
							opacity: 0,
							scale: 0,
						}
					: false
			}
			animate={{
				opacity: 1,
				scale: 1,
			}}
			transition={{
				layout: {
					type: "spring",
					stiffness: 500,
					damping: 35,
				},
				opacity: {
					duration: 0.2,
				},
				scale: {
					duration: 0.35,
					ease: EASINGS.out,
				},
			}}
		/>
	)}
</AnimatePresence>

Et pour la sortie, tu n'as même pas besoin de gérer exit dans le dot si la route qui quitte le header n'a plus de isActive : AnimatePresence s'en charge.

Tu peux lui ajouter :

exit={{
	opacity: 0,
	scale: 0,
	transition: {
		duration: 0.2,
		ease: EASINGS.out,
	},
}}

Donc au final :

<AnimatePresence initial={false}>
	{isActive && (
		<motion.span
			className="header__active-dot"
			layoutId="header-active-dot"
			layout="x"
			initial={
				isEnteringHeaderRoute
					? { opacity: 0, scale: 0 }
					: false
			}
			animate={{ opacity: 1, scale: 1 }}
			exit={{
				opacity: 0,
				scale: 0,
			}}
			transition={{
				layout: {
					type: "spring",
					stiffness: 500,
					damping: 35,
				},
				opacity: {
					duration: 0.2,
				},
				scale: {
					duration: 0.3,
					ease: EASINGS.out,
				},
			}}
		/>
	)}
</AnimatePresence>

Et il y a un détail important

Dans ton NAV_ITEMS, /404 est actuellement un NavLink :

{ to: "/404", labelKey: "nav.404" },

Donc si tu considères /404 comme une page hors-navigation, il faut le retirer de NAV_ITEMS, sinon pour ton code /404 est officiellement une route du header.

Si au contraire /404 est bien affiché dans le header mais que d'autres pages hors NAV_ITEMS existent, la logique ci-dessus fait exactement ce que tu veux :

route précédente route actuelle comportement
────────────────────────────────────────────────────────────
/saints /gallery layout="x"
/gallery /about layout="x"
/about /404 exit
/404 /saints entrée
/404 /gallery entrée
/autre-page /saints entrée
/saints /autre-page sortie

Et surtout, layout="x" reste totalement séparé de l'animation scale/opacity. C'est exactement la séparation que tu cherchais.
