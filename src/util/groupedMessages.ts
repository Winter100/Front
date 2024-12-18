import { MessageType } from '../types/message';
import { convertToKrTime } from './convertToKrTime';

interface GroupedMessagesType {
  [date: string]: {
    date: string;
    messages: MessageType[];
  };
}

export const groupedMessages = (
  messages: MessageType[]
): GroupedMessagesType => {
  return messages.reduce((acc, message) => {
    const dateKey = convertToKrTime(message.createdAt);
    if (!acc[dateKey]) {
      acc[dateKey] = { date: dateKey, messages: [] };
    }
    acc[dateKey].messages.push(message);
    return acc;
  }, {} as GroupedMessagesType);
};
