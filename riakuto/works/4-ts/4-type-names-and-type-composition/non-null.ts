type Resident = {
  familyName: string;
  lastName: string;
  mom?: Resident;
};

// resident.mom.lastNameの箇所でコンパイルエラーが出る ( `mom` プロパティは省略可能なため )
const getMomName = (resident: Resident): string => resident.mom.lastName;
const patty = { familyName: 'Hope-Rabbit', lastName: 'patty' };
getMomName(patty);
