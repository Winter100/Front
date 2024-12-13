import { useChatParticipants } from './useChatParticipants';
import { usePartner } from './usePartner';

export const usePartnerWithParticipants = (chatRoomId: number) => {
  const {
    data: partnerId,
    isLoading: isParticipantsLoading,
    isError: isParticipantsError,
  } = useChatParticipants(chatRoomId);

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
