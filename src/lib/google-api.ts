// Client-side Google Business Profile API calls
export class GoogleBusinessProfileAPI {
  private accessToken: string;
  private refreshToken?: string;

  constructor(accessToken: string, refreshToken?: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  private async makeRequest(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get user's business accounts
  async getBusinessAccounts() {
    try {
      const response = await this.makeRequest(
        'https://mybusinessbusinessinformation.googleapis.com/v1/accounts'
      );
      return response.accounts || [];
    } catch (error) {
      console.error('Error fetching business accounts:', error);
      throw error;
    }
  }

  // Get locations for a business account
  async getLocations(accountId: string) {
    try {
      const response = await this.makeRequest(
        `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${accountId}/locations`
      );
      return response.locations || [];
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }

  // Create a local post
  async createLocalPost(locationId: string, postData: {
    summary: string;
    callToAction?: {
      actionType: 'LEARN_MORE' | 'BOOK' | 'ORDER_ONLINE' | 'SHOP' | 'SIGN_UP';
      url?: string;
    };
    media?: {
      mediaFormat: 'PHOTO' | 'VIDEO';
      sourceUrl: string;
    }[];
  }) {
    try {
      const response = await this.makeRequest(
        `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${locationId}/localPosts`,
        {
          method: 'POST',
          body: JSON.stringify({
            summary: postData.summary,
            callToAction: postData.callToAction,
            media: postData.media
          })
        }
      );
      return response;
    } catch (error) {
      console.error('Error creating local post:', error);
      throw error;
    }
  }

  // Get local posts for a location
  async getLocalPosts(locationId: string) {
    try {
      const response = await this.makeRequest(
        `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${locationId}/localPosts`
      );
      return response.localPosts || [];
    } catch (error) {
      console.error('Error fetching local posts:', error);
      throw error;
    }
  }

  // Get insights for a location
  async getLocationInsights(locationId: string, startDate: string, endDate: string) {
    try {
      const response = await this.makeRequest(
        `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${locationId}/reportInsights`,
        {
          method: 'POST',
          body: JSON.stringify({
            basicRequest: {
              metricRequests: [
                {
                  metric: 'QUERIES_DIRECT',
                  options: ['AGGREGATED_DAILY']
                },
                {
                  metric: 'QUERIES_INDIRECT',
                  options: ['AGGREGATED_DAILY']
                },
                {
                  metric: 'QUERIES_CHAIN',
                  options: ['AGGREGATED_DAILY']
                },
                {
                  metric: 'VIEWS_MAPS',
                  options: ['AGGREGATED_DAILY']
                },
                {
                  metric: 'VIEWS_SEARCH',
                  options: ['AGGREGATED_DAILY']
                },
                {
                  metric: 'ACTIONS_WEBSITE',
                  options: ['AGGREGATED_DAILY']
                },
                {
                  metric: 'ACTIONS_PHONE',
                  options: ['AGGREGATED_DAILY']
                },
                {
                  metric: 'ACTIONS_DRIVING_DIRECTIONS',
                  options: ['AGGREGATED_DAILY']
                },
                {
                  metric: 'PHOTOS_VIEWS_MERCHANT',
                  options: ['AGGREGATED_DAILY']
                },
                {
                  metric: 'PHOTOS_VIEWS_CUSTOMERS',
                  options: ['AGGREGATED_DAILY']
                },
                {
                  metric: 'PHOTOS_COUNT_MERCHANT',
                  options: ['AGGREGATED_DAILY']
                },
                {
                  metric: 'PHOTOS_COUNT_CUSTOMERS',
                  options: ['AGGREGATED_DAILY']
                }
              ],
              timeRange: {
                startDate: {
                  year: parseInt(startDate.split('-')[0]),
                  month: parseInt(startDate.split('-')[1]),
                  day: parseInt(startDate.split('-')[2])
                },
                endDate: {
                  year: parseInt(endDate.split('-')[0]),
                  month: parseInt(endDate.split('-')[1]),
                  day: parseInt(endDate.split('-')[2])
                }
              }
            }
          })
        }
      );
      return response;
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  }

  // Update a local post
  async updateLocalPost(locationId: string, postId: string, postData: any) {
    try {
      const response = await this.makeRequest(
        `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${locationId}/localPosts/${postId}`,
        {
          method: 'PATCH',
          body: JSON.stringify(postData)
        }
      );
      return response;
    } catch (error) {
      console.error('Error updating local post:', error);
      throw error;
    }
  }

  // Delete a local post
  async deleteLocalPost(locationId: string, postId: string) {
    try {
      await this.makeRequest(
        `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${locationId}/localPosts/${postId}`,
        {
          method: 'DELETE'
        }
      );
      return true;
    } catch (error) {
      console.error('Error deleting local post:', error);
      throw error;
    }
  }
}

// Utility function to create API instance
export function createGoogleBusinessAPI(accessToken: string, refreshToken?: string) {
  return new GoogleBusinessProfileAPI(accessToken, refreshToken);
}
