import { useState } from "react";
import { useCurrentUser } from '@/app/context/currentUserContext';
import { ToastContainer, toast } from "react-toastify";

const DailyPrize = ({ prize = 5000, disabled = false }) => {
    const [number, setNumber] = useState("00000");
    const { currentUser, setCurrentUser } = useCurrentUser();

    const scrambleNumber = () => {
        // number scramble config
        // This controls how long it takes to dsiplay a number
        let maxUpdates = 50;
        const updateInterval = 50;
        let updates = 0;

        const updateNumber = () => {
            setNumber(Math.floor(Math.random() * 90000) + 10000);
            updates++;
            if (updates >= maxUpdates) {
                setNumber(String(prize).padStart(5, "0"));
                // ======================
                // Add additonal code here to update the user's wallet with the prize amount
                const updatedBalance = currentUser.wallet.balance + prize
                setCurrentUser(prevUser => ({
                    ...prevUser,
                    wallet: {
                        ...prevUser.wallet,
                        balance: updatedBalance
                    }
                }))
                fetch('/api/updateCoins', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: currentUser.email,
                        updatedBalance,
                    }),
                });
                // add logic to limit the number of times the prize can be claimed using the disabled prop and date
                // ======================
                return;
            }
            setTimeout(updateNumber, updateInterval);
        };
        toast('Your coins are added to your wallet!', {
            hideProgressBar: false,
            autoClose: 4600,
            type: "success",
        })

        // simple diasabled check but feel free to make this more complex if you want
        !disabled && updateNumber();
    };

    console.log(number);
    console.log(prize);

    return (
        <div>
        <svg width='544px' height='542.353px' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
            <defs>
                <filter x='-20.0%' y='-14.3%' width='140.0%' height='140.0%' filterUnits='objectBoundingBox' id='filter-2'>
                    <feOffset dy={2} in='SourceAlpha' result='shadowOffsetOuter1' />
                    <feGaussianBlur stdDeviation={2} in='shadowOffsetOuter1' result='shadowBlurOuter1' />
                    <feColorMatrix values='0 0 0 0 0.655923595 0 0 0 0 0.655923595 0 0 0 0 0.655923595 0 0 0 0.5 0' in='shadowBlurOuter1' />
                </filter>
                <filter x='-40.0%' y='-28.6%' width='180.0%' height='180.0%' filterUnits='objectBoundingBox' id='filter-4'>
                    <feOffset dy={2} in='SourceAlpha' result='shadowOffsetOuter1' />
                    <feGaussianBlur stdDeviation={2} in='shadowOffsetOuter1' result='shadowBlurOuter1' />
                    <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' in='shadowBlurOuter1' />
                </filter>
                <filter x='-40.0%' y='-28.6%' width='180.0%' height='180.0%' filterUnits='objectBoundingBox' id='filter-6'>
                    <feOffset dy={2} in='SourceAlpha' result='shadowOffsetOuter1' />
                    <feGaussianBlur stdDeviation={2} in='shadowOffsetOuter1' result='shadowBlurOuter1' />
                    <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' in='shadowBlurOuter1' />
                </filter>
                <filter x='-40.0%' y='-28.6%' width='180.0%' height='180.0%' filterUnits='objectBoundingBox' id='filter-8'>
                    <feOffset dy={2} in='SourceAlpha' result='shadowOffsetOuter1' />
                    <feGaussianBlur stdDeviation={2} in='shadowOffsetOuter1' result='shadowBlurOuter1' />
                    <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' in='shadowBlurOuter1' />
                </filter>
                <path
                    d='M36.5 53C26.848 53 19 45.152 19 35.5 19 25.848 26.848 18 36.5 18 46.152 18 54 25.848 54 35.5 54 45.152 46.152 53 36.5 53Z'
                    id='path-1'
                />
                <path d='M70 0a8.75 8.75 0 1 1 0 17.5A8.75 8.75 0 0 1 70 0Z' id='path-3' />
                <path d='M8.75 0a8.75 8.75 0 1 1 0 17.5 8.75 8.75 0 0 1 0-17.5Z' id='path-5' />
                <path d='M131.25 0a8.75 8.75 0 1 1 0 17.5 8.75 8.75 0 0 1 0-17.5Z' id='path-7' />
            </defs>
            <g stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
                <g transform='translate(-231.576 -182)'>
                    <g id='machine' transform='translate(231.576 182)'>
                        <path
                            d='M472.503 314.851v-96.25c0-24.125-19.625-43.75-43.75-43.75h-50.051l38.691-154.73-108.78 88.969L244.929 0 181.3 109.09 72.61 20.102l38.691 154.75H61.25c-24.125 0-43.75 19.625-43.75 43.75v255.36C7.34 477.587 0 487.212 0 498.603v43.75h490v-43.75c0-11.391-7.34-21.016-17.5-24.641v-54.109l.003-105.002Z'
                            id='slot-machine'
                            fill='#000'
                            fillRule='nonzero'
                        />
                        <g id='screen' transform='translate(35.004 192.357)'>
                            <path
                                d='M26.248 0h367.5c14.473 0 26.25 11.777 26.25 26.25V280h-92.629l-17.5-17.5h-199.74l-17.5 17.5H0V26.25C0 11.777 11.777 0 26.25 0h-.002Z'
                                id='screen-frame'
                                fill='#000'
                                fillRule='nonzero'
                            />
                            <path
                                d='M140.496 245.143h238.391c8.837 0 16-7.163 16-16v-195.5c0-8.837-7.163-16-16-16H33.996c-8.837 0-16 7.163-16 16v195.5c0 8.837 7.163 16 16 16h106.5Z'
                                fill='#EFEFEF'
                                fillRule='nonzero'
                            />
                            <text id='Value' fontFamily='VCROSDMono, VCR OSD Mono' fontSize='81.9' fontWeight='normal' fill='#000'>
                                <tspan x='86.4492969' y='167.643'>
                                    {number}
                                </tspan>
                            </text>
                        </g>
                        <g id='button' transform='translate(472 368)' fillRule='nonzero' onClick={scrambleNumber} style={{ cursor: "pointer" }}>
                            <path d='M0 70V0h54c9.941 0 18 8.059 18 18v34c0 9.941-8.059 18-18 18H0Z' fill='#000' />
                            <g>
                                <use fill='#000' filter='url(#filter-2)' xlinkHref='#path-1' />
                                <use fill='red' xlinkHref='#path-1' />
                            </g>
                        </g>
                        <g id='crown' transform='translate(102.393 34.709)' fillRule='nonzero'>
                            <path fill='#DAA520' d='m0 32.398 83.684 68.512L142.536 0l58.887 100.89 83.781-68.531-26.918 107.78H26.936z' />
                            <path
                                d='M142.61 70.144c-14.473 0-26.25 11.777-26.25 26.25s11.777 26.25 26.25 26.25 26.25-11.777 26.25-26.25-11.777-26.25-26.25-26.25Zm0 35c-4.828 0-8.75-3.93-8.75-8.75s3.922-8.75 8.75-8.75c4.828 0 8.75 3.93 8.75 8.75s-3.922 8.75-8.75 8.75Z'
                                id='Shape'
                                fill='#000'
                            />
                            <path
                                d='M63.86 113.894a8.75 8.75 0 1 1-17.501-.001 8.75 8.75 0 0 1 17.501.001M230.11 122.644a8.75 8.75 0 1 1 .001-17.501 8.75 8.75 0 0 1-.001 17.501Z'
                                fill='#000'
                            />
                        </g>
                        <g id='dots' transform='translate(175.003 489.853)' fillRule='nonzero'>
                            <g>
                                <use fill='#000' filter='url(#filter-4)' xlinkHref='#path-3' />
                                <use fill='#FFF' xlinkHref='#path-3' />
                            </g>
                            <g>
                                <use fill='#000' filter='url(#filter-6)' xlinkHref='#path-5' />
                                <use fill='#DCB730' xlinkHref='#path-5' />
                            </g>
                            <g>
                                <use fill='#000' filter='url(#filter-8)' xlinkHref='#path-7' />
                                <use fill='red' xlinkHref='#path-7' />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        </div>
    );
};

export default DailyPrize;
