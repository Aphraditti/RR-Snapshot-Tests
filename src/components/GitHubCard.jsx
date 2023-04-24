
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap"

export default function GitHubCard() {
    const [githubData, setGithubData] = useState({
        name: '',
        avatar_url: '',
        bio: ''
    });

    useEffect(() => {
        fetch('https://api.github.com/users/sfanetti')
            .then(res => res.json())
            .then(data => setGithubData(data))
    });

    return (
        <Card>
            <Card.Body>
                <Card.Img
                    variant="top"
                    src={ githubData.avatar_url }
                    alt=
                    "Github avatar"
                    />
                    <Card.Title>
                        <h2>{
                            githubData.name
                            }</h2>
                    </Card.Title>
                    <Card.Text>
                        {
                            githubData.bio
                        }
                    </Card.Text>
            </Card.Body>
        </Card>
    )

}