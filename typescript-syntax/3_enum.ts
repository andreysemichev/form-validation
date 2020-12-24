enum Membership {
  Simple, // 1
  Standard, // 2
  Premium // 3
};

const membership = Membership.Standard; // 1
const membershipReverse = Membership[2]; // Premium

enum SocialMedia {
  VK = "vkontakte",
  FB = "facebook",
  IG = "instagram"
}

const sicialMedia = SocialMedia.FB; // facebook