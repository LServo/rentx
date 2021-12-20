interface IDateProvider {
    compare(start_date: Date, end_date: Date): Promise<any>;
}

export { IDateProvider };
