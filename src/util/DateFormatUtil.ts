import { DateTime } from 'luxon'

export class DateFormatUtil {

  public static formatDate(date: Date) : string {
    return DateTime
      .fromJSDate(date)
      .toFormat("dd.MM.yyyy HH:mm")
  }
}
