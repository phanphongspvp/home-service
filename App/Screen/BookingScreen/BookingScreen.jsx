import { View, Text, FlatList } from "react-native";
import Heading from "../../Components/Heading";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "../BusinessListByCategoryScreen/BusinessListItem"

export default function BookingScreen() {

    const { user } = useUser();
    const [bookingList, setBookingList] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        user && getUserBookings();
    }, [user]);

    /**
     * Get User Booking
     */
    const getUserBookings = () => {
        setLoading(true);
        GlobalApi.getUserBooking(user.primaryEmailAddress.emailAddress).then(res => {
            setBookingList(res.data.bookings);
            setLoading(false);
        })
    }

    return (
        <View style={{ padding: 20, paddingTop: 30 }}>
            <Heading text={"Danh sách đặt trước"} />
            <FlatList
                data={bookingList}
                onRefresh={() => getUserBookings()}
                showsHorizontalScrollIndicator={false}
                refreshing={loading}
                renderItem={({item}) => (
                    <BusinessListItem
                        business={item?.businessList}
                        booking={item}
                    />
                )}
            />
        </View>
    );
}