// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import av1 from '@src/assets/images/avatars/10-small.png';
import av2 from '@src/assets/images/avatars/1-small.png';
import av3 from '@src/assets/images/avatars/9-small.png';
import av4 from '@src/assets/images/avatars/11-small.png';
import av5 from '@src/assets/images/avatars/12-small.png';
import av6 from '@src/assets/images/avatars/6-small.png';

function makeUser(
    id,
    status,
    name,
    email,
    avatar,
    discount,
    mintDate,
    claimed
) {
    return {
        id,
        invoiceStatus: status,
        client: {
            name,
            companyEmail: email,
        },
        avatar,
        discount,
        mintDate,
        claimed,
    };
}

const data = [
    makeUser(
        4987,
        'Paid',
        'Jordan Stevenson',
        'don85@johnson.com',
        '',
        25,
        '04 Apr 2022',
        true
    ),
    makeUser(
        5000,
        'Downloaded',
        'Stephanie Burns',
        'brenda49@taylor.info',
        av1.src,
        20,
        '04 Apr 2022',
        false
    ),
    makeUser(
        4925,
        'Paid',
        'Tony Herrera',
        'smithtiffany@powers.com',
        av2.src,
        15,
        '03 Apr 2022',
        true
    ),
    makeUser(
        3225,
        'Sent',
        'Kevin Patton',
        'mejiageorge@lee-perez.com',
        av3.src,
        15,
        '01 Apr 2022',
        false
    ),
    makeUser(
        4991,
        'Draft',
        'Julie Donovan',
        'brandon07@pierce.com',
        av4.src,
        15,
        '25 Mar 2022',
        false
    ),
    makeUser(
        3491,
        'Paid',
        'Amanda Phillips',
        'guerrerobrandy@beasley-harper.com',
        '',
        20,
        '15 Mar 2022',
        false
    ),
    makeUser(
        4993,
        'Draft',
        'Christina Collier',
        'williamshenry@moon-smith.com',
        '',
        20,
        '15 Mar 2022',
        true
    ),
    makeUser(
        2341,
        'Paid',
        'David Flores',
        'margaretharvey@russell-murray.com',
        av5.src,
        20,
        '10 Mar 2022',
        false
    ),
    makeUser(
        2551,
        'Downloaded',
        'Valerie Perez',
        'dianarodriguez@villegas.com',
        av6.src,
        20,
        '05 Mar 2022',
        false
    ),
    makeUser(
        1478,
        'Downloaded',
        'Susan Dickerson',
        'bwilson@norris-brock.com',
        '',
        20,
        '01 Mar 2022',
        true
    ),
];

const paginateArray = (array, perPage, page) =>
    array.slice((page - 1) * perPage, page * perPage);

export const getData = createAsyncThunk(
    'appInvoice/getData',
    async (params) => {
        const allCoupons = (await (await fetch('/api/campaigns')).json()).map(
            (aCoupon) =>
                makeUser(
                    aCoupon.id,
                    aCoupon.status,
                    aCoupon.name,
                    aCoupon.email,
                    '', // TODO: image based on email
                    aCoupon.discount,
                    new Date(aCoupon.mintDate).toLocaleDateString(),
                    aCoupon.claimed
                )
        );
        const response = {
            data: {
                invoices: paginateArray(
                    allCoupons,
                    params.perPage,
                    params.page
                ),
                allData: allCoupons,
                total: allCoupons.length,
            },
        };
        return {
            params,
            data: response.data.invoices,
            allData: response.data.allData,
            total: response.data.total,
        };
    }
);

export const deleteInvoice = createAsyncThunk(
    'appInvoice/deleteInvoice',
    async (id, { dispatch, getState }) => {
        await dispatch(getData(getState().invoice.params));
        return id;
    }
);

export const appInvoiceSlice = createSlice({
    name: 'appInvoice',
    initialState: {
        data: [],
        total: 0,
        params: {},
        allData: [],
        totalUsers: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            const { data, allData, total, params } = action.payload;
            state.data = data;
            state.allData = allData;
            state.total = total;
            state.params = params;
            state.totalUsers = allData.reduce((acc, aCoupon) => {
                acc.add(aCoupon.client.companyEmail);
                return acc;
            }, new Set()).size;
        });
    },
});

export default appInvoiceSlice.reducer;
