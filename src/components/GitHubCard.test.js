import { render, screen, waitFor } from "@testing-library/react";
import renderer from 'react-test-renderer';
import GitHubCard from "./GitHubCard";

const DEFAULT_MOCK_DATA = {
    name: 'ahiat',
    avatar_url: 'https://avatars.githubusercontent.com/u/117119563?v=4',
    bio: 'She is a smart and funny lady'

}

const DEFAULT_AVATAR_ALT = 'Github avatar'

describe('Test GitHubCard for features when', () => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify(DEFAULT_MOCK_DATA))
        render(<GitHubCard />);
    });
    afterEach(() => {
        fetch.resetMocks();
    })

    test('it containts a photo of the github user', async () => {
        const avatarImage = await waitFor(() => screen.getByAltText('Github avatar'));
        expect(avatarImage).toHaveAttribute('src',
            expect.stringContaining(DEFAULT_MOCK_DATA.avatar_url)
        );
    });

    test('it contains the name of the github user', async () => {
        const userName= await waitFor(() => screen.getByRole('heading', { level: 2 }));
        expect(userName).toHaveTextContent(DEFAULT_MOCK_DATA.name)
    });

    test('it contains a blurb about the github user', async () => {
        const blurb = await waitFor(() => screen.getByRole('paragraph'));
        expect(blurb).toHaveTextContent(DEFAULT_MOCK_DATA.bio);
    });
});

test('it renders a snapshot', () => {
    const tree = renderer.create(<GitHubCard/>).toJSON();
    expect(tree).toMatchSnapshot();
})
