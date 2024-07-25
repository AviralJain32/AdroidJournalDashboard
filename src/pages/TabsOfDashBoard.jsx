import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import SubmissionJournalPage from './SubmissionJournalPage'
import ShowVersionsOfPublicationPage from './ShowVersionsOfPublicationPage'
import CreateVersionOfPublication from './CreateVersionOfPublication'

const TabsOfDashBoard = () => {
  return (
    <div>
      <Tabs variant='enclosed'>
        <TabList>
            <Tab>Submissions</Tab>
            <Tab>Versions Of Publications</Tab>
            <Tab>Create a Version of publication for the website</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <SubmissionJournalPage/>
            </TabPanel>
            <TabPanel>
              <ShowVersionsOfPublicationPage/>
            </TabPanel>
            <TabPanel>
            <CreateVersionOfPublication/>
            </TabPanel>
        </TabPanels>
    </Tabs>
    </div>
  )
}

export default TabsOfDashBoard
