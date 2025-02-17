import React from "react";
import { LOADING, MONTH_ORDER, TOTAL } from "../utils/constants";

const RewardsCalculator = () => {
    const [customerData, setCustomerData] = React.useState([]);

    const rewardPointsCalulator = (userData) => {
        let result = {};
        let monthFilter = []
        if (userData) {
            userData?.map((user) => {
                const fullName = `${user.firstName} ${user.lastName}`;
                const amount = parseFloat(user?.purchaseAmount)
                const purchaseMonth = new Date(user.lastPurchaseDate).toLocaleString('default', { month: 'long' });
                if (!monthFilter?.includes(purchaseMonth)) {
                    monthFilter.push(purchaseMonth)
                }
                if (!result[fullName]) {
                    result[fullName] = {
                    }
                }
                if (!result[fullName][purchaseMonth]) {
                    result[fullName][purchaseMonth] = 0;
                }
                let points = 0;
                if (amount > 100) {
                    points += (amount - 100) * 2
                }
                if (amount > 50) {
                    points += Math.min(amount, 100) - 50;
                }
                result[fullName][purchaseMonth] += points;
                result[fullName].total = (result[fullName].total || 0) + points;
                return result;
            })
        }
        monthFilter.sort((a, b) => MONTH_ORDER[a] - MONTH_ORDER[b]);
        setCustomerData(Object.keys(result)?.map(el => {
            return {
                Customer: el,
                [monthFilter[0]]: result[el][monthFilter[0]] || 0,
                [monthFilter[1]]: result[el][monthFilter[1]] || 0,
                [monthFilter[2]]: result[el][monthFilter[2]] || 0,
                Total: result[el][TOTAL]
            }
        }))
    }
    const fetchData = async () => {
        try {
            const apiData = await fetch('./userData.json');
            const jsonData = await apiData.json();
            rewardPointsCalulator(jsonData?.users);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            {customerData?.length === 0 ? <div>{LOADING} </div> :
                <table>
                    <thead>
                        <tr>
                            {Object.keys(customerData[0])?.map((header) => {
                                return <th key={header}>{header}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {customerData?.map((customer, i) => {
                            return <tr key={i}>
                                {Object.values(customer)?.map((el, ind) => {
                                    return <td key={ind}>
                                        {isNaN(el) ? el : el.toFixed(2)}
                                    </td>
                                })}

                            </tr>
                        })}

                    </tbody>
                </table>
            }
        </div>
    )
}

export default RewardsCalculator;