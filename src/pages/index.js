import React from "react";
import Typed from "react-typed";
import { motion } from "framer-motion";
import Layout from "../components/layout";
import { Container } from "../components/common";
import { HeroText, Profile } from "../components/profile";
import {
  LandingHero,
  Name,
  SocialList,
  SocialListItem,
} from "../components/landing-hero";
import Projects from "../components/projects";
import { useSiteMetadata } from "../hooks";

const IndexPage = () => {
  const { socialLinks } = useSiteMetadata();

  return (
    <Layout>
      <motion.div initial="enter" animate="onLoad">
        <Container isLandingPage>
          <LandingHero>
            <motion.h1 variants={nameVariants}>
              <Name to="/">
                alexander<span>melo.</span>
              </Name>
            </motion.h1>
            <Profile variants={fadeIn} transition={{ delay: 0.2, duration: 1 }}>
              <HeroText>
                <Typed
                  strings={[
                    "User Experience Engineer working for IBM in Austin.",
                    "Solving user's needs. One prototype at a time.",
                  ]}
                  typeSpeed={40}
                  backSpeed={20}
                  backDelay={3000}
                  startDelay={500}
                />
              </HeroText>

              <SocialList
                initial="enter"
                animate="onLoad"
                variants={socialListVariants}
              >
                {socialLinks.map((link) => {
                  return (
                    <SocialListItem
                      variants={socialListItemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <a
                        rel="noopener noreferrer"
                        href={link.to}
                        target="_blank"
                      >
                        {link.name}
                      </a>
                    </SocialListItem>
                  );
                })}
              </SocialList>
            </Profile>
          </LandingHero>
        </Container>
        <Projects />
      </motion.div>
    </Layout>
  );
};

const nameVariants = {
  enter: {
    x: -150,
    opacity: 0,
  },
  onLoad: {
    opacity: 1,
    x: 0,
  },
  transition: { duration: 0.2 },
};

const fadeIn = {
  enter: { opacity: 0 },
  onLoad: { opacity: 1 },
};

const socialListVariants = {
  onLoad: { transition: { staggerChildren: 0.2, delayChildren: 1 } },
};

const socialListItemVariants = {
  enter: { opacity: 0, x: -50 },
  onLoad: { opacity: 1, x: 0 },
};

export default IndexPage;
