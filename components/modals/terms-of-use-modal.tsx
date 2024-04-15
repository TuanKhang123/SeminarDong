"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface TermsOfUsemModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
};

export const TermsOfUsemModal = ({
    children,
    onConfirm
}: TermsOfUsemModalProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <h2 className={cn("text-xl font-medium text-black")}>
                            Terms of use
                        </h2>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className={cn("overflow-y-scroll max-h-60")}>
                            <h3 className={cn("text-lg font-medium text-black")}>Ownership of Site; Agreement to Terms of Use</h3>
                            These Terms and Conditions of Use (the "Terms of Use") apply to the Apple web site located at www.apple.com, and all associated sites linked to www.apple.com by Apple, its subsidiaries and affiliates, including Apple sites around the world (collectively, the "Site"). The Site is the property of Apple Inc. ("Apple") and its licensors. BY USING THE SITE, YOU AGREE TO THESE TERMS OF USE; IF YOU DO NOT AGREE, DO NOT USE THE SITE.

                            Apple reserves the right, at its sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time. It is your responsibility to check these Terms of Use periodically for changes. Your continued use of the Site following the posting of changes will mean that you accept and agree to the changes. As long as you comply with these Terms of Use, Apple grants you a personal, non-exclusive, non-transferable, limited privilege to enter and use the Site.

                            <h3 className={cn("text-lg font-medium text-black")}>Content</h3>
                            All text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork and computer code (collectively, "Content"), including but not limited to the design, structure, selection, coordination, expression, "look and feel" and arrangement of such Content, contained on the Site is owned, controlled or licensed by or to Apple, and is protected by trade dress, copyright, patent and trademark laws, and various other intellectual property rights and unfair competition laws.

                            Except as expressly provided in these Terms of Use, no part of the Site and no Content may be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted or distributed in any way (including "mirroring") to any other computer, server, Web site or other medium for publication or distribution or for any commercial enterprise, without Apple’s express prior written consent.

                            You may use information on Apple products and services (such as data sheets, knowledge base articles, and similar materials) purposely made available by Apple for downloading from the Site, provided that you (1) not remove any proprietary notice language in all copies of such documents, (2) use such information only for your personal, non-commercial informational purpose and do not copy or post such information on any networked computer or broadcast it in any media, (3) make no modifications to any such information, and (4) not make any additional representations or warranties relating to such documents.


                            <h3 className={cn("text-lg font-medium text-black")}>Your Use of the Site</h3>
                            You may not use any "deep-link", "page-scrape", "robot", "spider" or other automatic device, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Site or any Content, or in any way reproduce or circumvent the navigational structure or presentation of the Site or any Content, to obtain or attempt to obtain any materials, documents or information through any means not purposely made available through the Site. Apple reserves the right to bar any such activity.

                            You may not attempt to gain unauthorized access to any portion or feature of the Site, or any other systems or networks connected to the Site or to any Apple server, or to any of the services offered on or through the Site, by hacking, password "mining" or any other illegitimate means.

                            You may not probe, scan or test the vulnerability of the Site or any network connected to the Site, nor breach the security or authentication measures on the Site or any network connected to the Site. You may not reverse look-up, trace or seek to trace any information on any other user of or visitor to the Site, or any other customer of Apple, including any Apple account not owned by you, to its source, or exploit the Site or any service or information made available or offered by or through the Site, in any way where the purpose is to reveal any information, including but not limited to personal identification or information, other than your own information, as provided for by the Site.

                            You agree that you will not take any action that imposes an unreasonable or disproportionately large load on the infrastructure of the Site or Apple’s systems or networks, or any systems or networks connected to the Site or to Apple.

                            You agree not to use any device, software or routine to interfere or attempt to interfere with the proper working of the Site or any transaction being conducted on the Site, or with any other person’s use of the Site.

                            You may not forge headers or otherwise manipulate identifiers in order to disguise the origin of any message or transmittal you send to Apple on or through the Site or any service offered on or through the Site. You may not pretend that you are, or that you represent, someone else, or impersonate any other individual or entity.

                            You may not use the Site or any Content for any purpose that is unlawful or prohibited by these Terms of Use, or to solicit the performance of any illegal activity or other activity which infringes the rights of Apple or others.
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Agree and continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
