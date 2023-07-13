import { Link } from "react-router-dom";
import styles from "./About.module.css";

import { Accordion, AccordionItem } from "@szhsin/react-accordion";

const About = () => {
    return (
        <div className={styles.about}>
            <h2>
                Sobre o Mini <span>Blog</span>
            </h2>
            <p>
                Este projeto consiste em um blog feito com <span>React</span> no
                front-end e <span>Firebase</span> no backend.
            </p>
            <div className={styles.accordion}>
                <Accordion transition transitionTimeout={250}>
                    <AccordionItem
                        header="What is Lorem Ipsum?"
                        className={styles.itemBtn}
                    >
                        <span className={styles.itemBtnExpanded}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Exercitationem ipsa sint, doloremque alias
                            maiores unde laboriosam quasi quod laborum enim non
                            natus. Voluptate blanditiis est quis sit magni
                            repellat consequatur.
                        </span>
                    </AccordionItem>

                    <AccordionItem header="Where does it come from?">
                        Quisque eget luctus mi, vehicula mollis lorem. Proin
                        fringilla vel erat quis sodales. Nam ex enim, eleifend
                        venenatis lectus vitae, accumsan auctor mi.
                    </AccordionItem>

                    <AccordionItem header="Why do we use it?">
                        Suspendisse massa risus, pretium id interdum in, dictum
                        sit amet ante. Fusce vulputate purus sed tempus feugiat.
                    </AccordionItem>
                </Accordion>
            </div>

            <Link to="/posts/create" className="btn">
                Criar Post
            </Link>
        </div>
    );
};

export default About;
