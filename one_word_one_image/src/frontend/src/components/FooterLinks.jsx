import { createStyles, Container, Group, Anchor } from '@mantine/core';
import Logo from "../assets/images/logo.svg";

const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));



export default function FooterLinks() {
    const links = [
        {
            "link": "#",
            "label": "Home"
        },
        {
            "link": "#",
            "label": "Feed"
        },
        {
            "link": "#",
            "label": "Login"
        },
        {
            "link": "#",
            "label": "GitHub"
        }
    ]

    const { classes } = useStyles();
    const items = links.map((link) => (
        <Anchor
            color="dimmed"
            key={link.label}
            href={link.link}
            onClick={(event) => event.preventDefault()
            }
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <img src={Logo} alt="logo-one_word_one_image" />
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
}