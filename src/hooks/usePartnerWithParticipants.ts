import { useChatParticipants } from './useChatParticipants';
import { useMyProfile } from './useMyProfile';
import { usePartner } from './usePartner';

export const usePartnerWithParticipants = (chatRoomId: number) => {
  const { data: myProfile } = useMyProfile();
  const myId = myProfile?.profileId ?? '';

  const {
    data: partnerId,
    isLoading: isParticipantsLoading,
    isError: isParticipantsError,
  } = useChatParticipants(chatRoomId, String(myId));

  const {
    data: partnerData,
    isLoading: isPartnerLoading,
    isError: isPartnerError,
  } = usePartner(chatRoomId, partnerId ?? 0);

  return {
    partnerData,
    isLoading: isParticipantsLoading || isPartnerLoading,
    isError: isParticipantsError || isPartnerError,
  };
};
