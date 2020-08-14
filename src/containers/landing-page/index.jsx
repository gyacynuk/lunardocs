import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as MoonSVG } from '../../assets/images/moon.svg'
import Spacer from '../../components/spacer';
import LandingNavBar from './landing-nav-bar';
import SlidingButton from '../../components/sliding-button';
import anime from 'animejs'
import { isMobileJs} from '../../theme/breakpoint'

const randXPos = () => Math.floor(Math.random() * 98) + 1
const randYPos = () => Math.floor(Math.random() * 90) + 1
const randSize = () => Math.floor(Math.random() * 3) + 1
const STARS = [...Array(60)]
    .map(e => [randYPos(), randXPos(), randSize()]) 
    .map(randData => ({top: randData[0], left: randData[1], size: randData[2]}));

/**
 * Stars
 */
const StarWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, #1e293b 100%);
`
const Star = styled.div`
    position: absolute;
    top: ${props => props.top}%;
    left: ${props => props.left}%;

    width: ${props => props.size}px;
    height: ${props => props.size}px;
    background-color: white;
    border-radius: 50%;
`

/**
 * Moon
 */
const MoonWrapper = styled.div`
    position: fixed;
    top: 20%;
    left: 50%;
    height: 80%;

    z-index: 151;
    overflow: visible;
    transform-origin: bottom center;

    ${({ theme }) => theme.isMobile`
        marigin-left: -24px;
    `}

    pointer-events: none;
    will-change: transform;
    will-change: left, top;
`
const MoonImage = styled(MoonSVG)`
    border-radius: 50%;
    box-shadow: 0 0 12px #EBEFF7AA;

    ${({ theme }) => theme.isMobile`
        margin-left: -40px;
    `}

    will-change: width, height;
`

const MainColumn = styled.div`
    position absolute;
    top: 0;
    left: 0;
    width: 100%; 

    padding: 64px;
    ${({ theme }) => theme.isMobile`
        padding: 24px;
    `}

    display: block;
    
    transform: translateZ(0);
`

const HeroContainer = styled.div`
    position: absolute;
    z-index: 1;
    top: calc(20% + 96px);
    left: 50%;
    transform: translate(-50%, 0);

    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 48px;
`

const HeroText = styled.div`
    color: white;
    text-align: center;

    font-size: 3rem;
    font-weight: ${props => props.thin ? 100 : 700};
`

const Heading = styled.h1`
    color: white;
    font-size: 2rem;
`
const Temp = styled.p`
    color: white;
`

const LandingPage = () => {
    const [scrollAtTop, setScrollAtTop] = useState(true)
    const [state, setState] = useState([]);
    useEffect(() => {
        state.forEach(animation => animation.pause())

        if (!scrollAtTop) {
            const animations = [
                // Moon move to navbar
                anime({
                    targets: '.moonWrapper',
                    rotate: 360,
                    translateX: '0%',
                    translateY: '0%',
                    marginTop: '16px',
                    marginLeft: '64px',
                    top: '0%',
                    left: '0%',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
                // Moon shrink
                anime({
                    targets: '.moon',
                    width: '32px',
                    height: '32px',
                    marginLeft: isMobileJs.matches ? '-40px' : '0px',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
                // Header text shift
                anime({
                    targets: '.headerHeading',
                    marginLeft: '48px',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
            ]

            setState(animations)
        } else {
            const animations = [
                // Moon move to center
                anime({
                    targets: '.moonWrapper',
                    translateX: '-50%',
                    translateY: '0%',
                    marginTop: '0px',
                    marginLeft: '0px',
                    top: '20%',
                    left: '50%',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
                // Moon grow
                anime({
                    targets: '.moon',
                    width: '96px',
                    height: '96px',
                    marginLeft: '0px',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
                // Header text shift
                anime({
                    targets: '.headerHeading',
                    marginLeft: '0px',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
            ]

            setState(animations)
        }
        
    }, [scrollAtTop]);

    useEffect(() => {
        let moonAppearAnimation = anime({
            targets: '.moonWrapper',
            translateX: ['-50%', '-50%'],
            rotate: [250, 360],
            duration: 3000,
            easing: 'easeOutExpo',
        })
        let moonGrowAnimation = anime({
            targets: '.moon',
            width: [32, 96],
            height: [32, 96],
            duration: 3000,
            easing: 'easeOutExpo',
        })

        anime.timeline({
            duration: 2000,
            easing: 'easeOutExpo',
        }).add({
            targets: '.heroText',
            opacity: [0, 1],
        })
        .add({
            targets: '.learnMoreButton',
            opacity: [0, 1],
        })

        const handleScroll = event => {
            moonAppearAnimation.pause()
            moonGrowAnimation.pause();
            if (event.target.scrollTop === 0) {
                setScrollAtTop(true);
            } else {
                setScrollAtTop(false);
            }
        }
        document.getElementById('appContainer').addEventListener('scroll', handleScroll);
        return () => document.getElementById('appContainer').removeEventListener('scroll', handleScroll);
    }, [])
    
    return (
        <>
            <LandingNavBar/>

            <StarWrapper>
                {STARS.map((props, index) => <Star key={index} {...props}/>)}
            </StarWrapper>

            <MoonWrapper className='moonWrapper'>
                <MoonImage className='moon'/>
            </MoonWrapper>

            <HeroContainer className='heroContainer'>
                <HeroText className='heroText' thin={true}>
                    Note Taking
                </HeroText>
                <HeroText className='heroText'>
                    Reimagined
                </HeroText>

                <SlidingButton
                className={'learnMoreButton'}
                width={'200px'}
                padding={'12px 0'}
                margin={'32px 0'}
                color={'white'}
                hoverColor={'black'}
                onClick={() => document.getElementById('anchor').scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                    Learn More
                </SlidingButton>
            </HeroContainer>

            <MainColumn>
                <Spacer height={'calc(100vh - 80px)'}/>
                <Spacer id="anchor" height={'80px'}/>
                <Heading id="anchor2">Fluidity</Heading>
                <Temp>
                    Gunwalls crack Jennys tea cup main sheet cutlass rigging belaying pin jury mast heave to Jack Ketch spanker. Parley Sail ho ho spanker jib bilge rat black spot Corsair spirits furl. Jib gangplank long boat dance the hempen jig bowsprit sheet lanyard Davy Jones' Locker cackle fruit bring a spring upon her cable. Hail-shot main sheet gaff crimp provost heave to mizzen doubloon grapple gabion. Capstan fire in the hole no prey, no pay league jolly boat bilge gunwalls cutlass pinnace hands. Spanish Main Sink me Sail ho Brethren of the Coast quarterdeck fore dance the hempen jig scourge of the seven seas wherry fathom. Haul wind coffer hands hogshead sheet rigging poop deck scurvy grog blossom clap of thunder. Swing the lead salmagundi weigh anchor Blimey Shiver me timbers shrouds heave down parley poop deck landlubber or just lubber. Aye topgallant bowsprit aft swing the lead mizzenmast barque capstan sheet knave. Chase Jack Tar Arr Spanish Main hardtack man-of-war parrel Admiral of the Black topgallant clap of thunder.
                </Temp>
                <Temp>
                    Dance the hempen jig wench red ensign heave to schooner hail-shot quarterdeck flogging gangplank gally. Fluke Shiver me timbers driver keel holystone stern Sail ho Jack Ketch crack Jennys tea cup coffer. Yardarm man-of-war careen broadside run a rig yo-ho-ho wherry gaff heave down aft. Heave down barque capstan Pieces of Eight swab fire ship belay Cat o'nine tails hardtack lee. Walk the plank broadside wherry yo-ho-ho yardarm gabion scourge of the seven seas strike colors loot Barbary Coast. Furl topmast Jolly Roger gibbet case shot hornswaggle mizzen walk the plank quarter jack. Lateen sail tack cable lugsail grapple six pounders piracy main sheet belaying pin overhaul. Barque rutters cog deadlights aft hempen halter Brethren of the Coast me galleon Yellow Jack. Long clothes pillage hogshead mizzen barque overhaul Barbary Coast coxswain spirits skysail. Fire in the hole rutters deadlights gangplank gun jack wench mutiny code of conduct fluke.
                </Temp>
                <Temp>
                    Transom capstan matey black spot Yellow Jack code of conduct dance the hempen jig brig careen keel. Port hang the jib measured fer yer chains scuttle transom trysail Cat o'nine tails Sail ho hands chase guns. Wherry schooner red ensign jolly boat cutlass lad lass gangplank careen aye. Fathom splice the main brace sheet Pieces of Eight measured fer yer chains code of conduct doubloon rum Buccaneer scourge of the seven seas. Coxswain poop deck Brethren of the Coast ho Chain Shot killick fire in the hole bilged on her anchor loot Cat o'nine tails. Pirate Round fathom wherry walk the plank Yellow Jack to go on account lugsail reef sails furl haul wind. Jib lookout Arr no prey, no pay dead men tell no tales reef Chain Shot bilged on her anchor scourge of the seven seas brigantine. Bilge rat log cutlass killick furl blow the man down barque spike lass case shot. Salmagundi walk the plank measured fer yer chains tender brigantine ho warp barkadeer deadlights crimp. Fire in the hole yawl clap of thunder squiffy Jolly Roger piracy maroon overhaul hardtack long clothes.
                </Temp>
                <Temp>
                    Lugsail swab grog tackle squiffy skysail red ensign Pieces of Eight jack cable. Grapple handsomely yardarm Brethren of the Coast spyglass capstan avast code of conduct interloper aye. Gabion swing the lead chantey draft yo-ho-ho hempen halter pink to go on account ye lookout. Spirits fathom bilged on her anchor squiffy ballast flogging six pounders measured fer yer chains dance the hempen jig transom. Gangplank hornswaggle Sail ho spanker American Main Jack Ketch Jack Tar lateen sail hang the jib black jack. Spirits log trysail chase guns smartly nipper walk the plank overhaul jack booty. American Main walk the plank matey league Sail ho to go on account pirate keel parrel yawl. Brig pillage landlubber or just lubber careen crow's nest long boat bilge grapple Chain Shot hail-shot. Hearties maroon coxswain Pirate Round run a shot across the bow loaded to the gunwalls fire in the hole bowsprit salmagundi crow's nest. Scuppers spyglass bilge crack Jennys tea cup yardarm booty topsail skysail Davy Jones' Locker gangplank.
                </Temp>
                <Temp>
                    Carouser fluke capstan coxswain bilge water bowsprit blow the man down spike gabion black jack. Heave down careen lanyard poop deck boatswain Blimey doubloon jib Sea Legs tackle. Spanish Main Sail ho hardtack carouser dance the hempen jig barque smartly Yellow Jack take a caulk trysail. Smartly hulk prow hands swing the lead driver Jolly Roger Brethren of the Coast topmast lass. Avast jury mast reef spirits mizzen Spanish Main Sea Legs barkadeer Pieces of Eight grapple. Run a rig interloper smartly come about long boat Admiral of the Black lad spanker hornswaggle boatswain. Boom cutlass to go on account carouser rum run a shot across the bow driver swing the lead snow Cat o'nine tails. Lugsail rum Letter of Marque tender wench Yellow Jack flogging yardarm bilge water brig. Plunder Admiral of the Black mizzen lanyard bring a spring upon her cable squiffy booty piracy ahoy Chain Shot. Transom parley scallywag plunder log fluke bucko barque lateen sail Yellow Jack.
                </Temp>
                <Temp>
                    Jolly boat gabion main sheet Corsair clap of thunder maroon line lass keelhaul tackle. Lad jack hulk prow sloop run a rig draft wench nipperkin tackle. Grog blossom weigh anchor line lookout run a rig nipper avast aye parrel cable. Lad bring a spring upon her cable plunder Privateer quarterdeck stern broadside flogging mutiny hang the jib. No prey, no pay weigh anchor starboard take a caulk bilged on her anchor plunder salmagundi broadside wherry holystone. Yardarm bilge rat come about cutlass swab piracy matey skysail walk the plank man-of-war. Gangplank main sheet Gold Road spirits fire ship chase guns piracy yard sutler careen. Squiffy black jack spirits execution dock heave down pillage starboard carouser doubloon ho. Admiral of the Black spike sloop lee aye scuttle nipper gabion parrel loaded to the gunwalls. Yard stern Chain Shot deadlights Letter of Marque reef sails lanyard main sheet topsail bowsprit.
                </Temp>
                <Temp>
                    Bucko bowsprit cackle fruit aft rum hardtack splice the main brace landlubber or just lubber scallywag list. Cat o'nine tails black spot shrouds skysail no prey, no pay prow brig keelhaul long boat Admiral of the Black. Spyglass hornswaggle man-of-war mizzenmast wherry cable landlubber or just lubber Jack Ketch hearties dance the hempen jig. Furl Davy Jones' Locker jury mast quarter hogshead Pirate Round Brethren of the Coast aye ballast case shot. Flogging maroon Privateer haul wind Buccaneer plunder Pieces of Eight bilge water heave down spyglass. Matey boatswain six pounders Brethren of the Coast loaded to the gunwalls fluke aft tender yard prow. Pirate lugsail topmast run a shot across the bow blow the man down league keelhaul starboard doubloon nipperkin. Bilge rat jolly boat hempen halter pink Davy Jones' Locker lugger swab dead men tell no tales nipperkin mizzenmast. Spanish Main reef sails Davy Jones' Locker line Pieces of Eight chantey bilge rat tender topgallant American Main. List run a shot across the bow tackle scuppers piracy scuttle clap of thunder bilge water dead men tell no tales keel.
                </Temp>
                <Temp>
                    Shiver me timbers Corsair booty grog black spot topmast mizzenmast black jack weigh anchor American Main. Square-rigged parrel nipperkin hempen halter chase scuttle no prey, no pay chantey chase guns me. Pinnace topmast bounty Barbary Coast list swab bring a spring upon her cable yo-ho-ho ho parley. Heave to scallywag furl Buccaneer walk the plank run a rig Privateer landlubber or just lubber fluke spyglass. Ballast boatswain rum gibbet ho reef brig marooned blow the man down rutters. Jack Ketch line pressgang broadside Jolly Roger piracy gabion parley rigging matey. Driver furl broadside long clothes chantey sheet quarter port sutler fire ship. Yellow Jack American Main hulk keel chandler hornswaggle overhaul maroon booty ahoy. Bilged on her anchor schooner carouser Brethren of the Coast bilge water avast keel reef sails long clothes bucko. Loaded to the gunwalls Blimey landlubber or just lubber brigantine fluke draft furl boom galleon Jack Tar.
                </Temp>
                <Temp>
                    Case shot aye stern cog spike Privateer gangway code of conduct hands weigh anchor. Jack Tar Yellow Jack gaff careen sloop poop deck grapple fire in the hole spanker Sink me. Grog plunder long boat lanyard squiffy prow ballast loaded to the gunwalls bilged on her anchor smartly. Gangplank Privateer capstan lee belaying pin take a caulk clipper scourge of the seven seas marooned list. Hulk topmast cackle fruit Corsair gun yard red ensign tender hogshead Jolly Roger. Hearties fire ship capstan rutters booty snow measured fer yer chains loot bucko haul wind. Stern Jack Ketch nipperkin scurvy chandler bilged on her anchor Letter of Marque lass prow booty. Tackle holystone swing the lead scallywag walk the plank boom black spot Pieces of Eight measured fer yer chains draught. Topsail chase landlubber or just lubber mizzenmast sheet strike colors coxswain lateen sail spike topmast. Fluke lass brig pinnace Privateer galleon haul wind run a shot across the bow tackle keel.
                </Temp>
            </MainColumn>
            
        </>
    );
};

LandingPage.propTypes = {};

export default LandingPage;