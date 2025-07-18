'use client'
import CommonLayout from "../layouts/commonLayout";
import MessengerUI from "./components/MessengerUI";


export default function SettingsPage() {

  return (
    <CommonLayout activePage="Inbox">
      {({ darkMode }) => (
        <>
          <div> {<MessengerUI darkMode={darkMode} />}</div>
        </>
      )}
    </CommonLayout>
  );
}