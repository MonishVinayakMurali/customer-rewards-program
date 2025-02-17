import { render, screen, waitFor } from '@testing-library/react';
import RewardsCalculator from '../components/RewardsCalculator';
import { LOADING } from '../utils/constants';

describe('RewardsCalculator component', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    users: [
                        {
                            "id": 1,
                            "firstName": "James",
                            "lastName": "Anderson",
                            "purchaseAmount": 70.50,
                            "lastPurchaseDate": "2024-10-15"
                        },
                        {
                            "id": 2,
                            "firstName": "David",
                            "lastName": "Williams",
                            "purchaseAmount": 150.40,
                            "lastPurchaseDate": "2024-10-10"
                        },
                    ]
                })
            })
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders loading state initially', () => {
        render(<RewardsCalculator />);
        expect(screen.getByText(LOADING)).toBeInTheDocument();
    });

    it('renders customer data after fetching', async () => {
        render(<RewardsCalculator />);

        await waitFor(() => expect(screen.queryByText(LOADING)).not.toBeInTheDocument());
        const userName = screen.getByText('James Anderson')
        const value = screen.getAllByText('150.80')
        expect(userName).toBeInTheDocument();
        expect(value[0]).toBeInTheDocument();
    });
});